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

      context 'when group has reached its maximum capacity' do
        let(:group) { create(:group, size: 1) }
        let!(:member) { create(:member, group:) }

        before do
          post group_requests_path(group), headers:
        end

        it 'does not create a new Request' do
          expect(Request.count).to eq(0)
        end

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body
          expect(json_response['errors']['group']).to include('El grupo ya ha alcanzado su capacidad máxima')
        end
      end

      context 'when user is already a member of the group' do
        let!(:member) { create(:member, user:, group:) }

        before do
          post group_requests_path(group), headers:
        end

        it 'does not create a new Request' do
          expect(Request.count).to eq(0)
        end

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body
          expect(json_response['errors']['user']).to include('Ya formas parte de este grupo')
        end
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

  # Update
  describe 'PATCH /groups/:group_id/requests/:id' do
    let(:user) { create :user }
    let(:group) { create :group }
    let!(:request) { create :request, user:, group: }
    let!(:admin_member) { create(:member, user:, group:, role: 'admin') }

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

  describe 'GET /groups/:group_id/requests' do
    let(:user) { create(:user) }
    let(:group) { create(:group) }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    context 'when user is authenticated' do
      before do
        headers
      end

      context 'when user is admin of the group' do
        let(:request1) { create :request, group: }
        let(:request2) { create :request, group: }
        before do
          group.members.create(user:, role: 'admin')
          request1
          request2
          get group_requests_path(group), headers:
        end

        it 'returns all requests for the group' do
          expect(response).to have_http_status(:ok)
          json_response = response.parsed_body
          expect(json_response).to be_an(Array)
          expect(json_response.size).to eq(2)

          request_ids = json_response.pluck('id')
          expect(request_ids).to include(request1.id, request2.id)

          request = json_response.first
          expect(request).to include(
            'id' => be_a(Integer),
            'status' => 'pending',
            'group_id' => group.id,
            'user_id' => be_a(Integer),
            'user_name' => be_a(String),
            'user_email' => be_a(String)
          )
        end
      end

      context 'when user is not an admin of the group' do
        before do
          get group_requests_path(group), headers:
        end

        it 'returns unauthorized' do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        get group_requests_path(group)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
