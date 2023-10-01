require 'rails_helper'

RSpec.describe 'Groups::Requests', type: :request do
  # Create
  describe 'POST /groups/:group_id/requests' do
    let(:user) { create :user }
    let(:group) { create :group }

    context 'when user is authenticated' do
      let(:headers) { { 'Authorization' => response.headers['Authorization'] } }

      before do
        # Authenticates user
        post user_session_path,
             params: {
               user: {
                 email: user.email,
                 password: user.password
               }
             }
      end

      context 'when there is no existing pending or accepted request' do
        before do
          post group_requests_path(group), headers:
        end

        it 'creates a Request successfully' do
          expect(response).to have_http_status(:created)
          expect(Request.count).to eq(1)
        end

        it 'assigns the logged-in user as the requester' do
          expect(Request.first.user).to eq(user)
        end

        it 'returns JSON containing request data' do
          json_response = response.parsed_body

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['status']).to eq('pending')
        end
      end

      context 'when there is an existing pending or accepted request' do
        let!(:existing_request) { create(:request, user:, group:) }

        before do
          post group_requests_path(group), headers:
        end

        it 'does not create a new Request' do
          expect(Request.count).to eq(1)
        end

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body
          expected_error = 'Ya hay una solicitud pendiente o aceptada para este usuario y grupo'
          expect(json_response['errors']['general']).to include(expected_error)
        end
      end

      context 'when user is not authenticated' do
        before do
          post group_requests_path(group)
        end

        it 'returns http unauthorized' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'returns JSON containing error message' do
          json_response = response.parsed_body

          expect(json_response).to include('Tienes que registrarte o iniciar sesión antes de continuar.')
        end
      end
    end
  end

  # Update
  describe 'PATCH /groups/:group_id/requests/:id' do
    let(:user) { create :user }
    let(:group) { create :group }
    let!(:request) { create :request, user:, group: }

    context 'when user is authenticated' do
      let(:headers) { { 'Authorization' => response.headers['Authorization'] } }

      before do
        # Authenticates user
        post user_session_path,
             params: {
               user: {
                 email: user.email,
                 password: user.password
               }
             }
      end

      context 'when updating status to rejected without a reason' do
        before do
          patch group_request_path(group, request), params: { status: 'rejected' }, headers:
        end

        it 'does not update the request' do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(request.reload.status).to eq('pending')
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body
          expect(json_response['errors']['reason']).to include('La razón es requerida para rechazar la solicitud')
        end
      end

      context 'when updating with an invalid status' do
        before do
          patch group_request_path(group, request), params: { status: 'invalid_status' }, headers:
        end

        it 'does not update the request' do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(request.reload.status).to eq('pending')
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body
          expect(json_response['errors']['status']).to include("'invalid_status' is not a valid status")
        end
      end

      context 'when updating status to rejected with a reason' do
        before do
          patch group_request_path(group, request), params: { status: 'rejected', reason: 'Not a fit for the group' },
                                                    headers:
        end

        it 'updates the request successfully' do
          expect(response).to have_http_status(:ok)
          expect(request.reload.status).to eq('rejected')
          expect(request.reason).to eq('Not a fit for the group')
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        patch group_request_path(group, request), params: { status: 'accepted' }
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body
        expect(json_response).to include('Tienes que registrarte o iniciar sesión antes de continuar.')
      end
    end
  end
end
