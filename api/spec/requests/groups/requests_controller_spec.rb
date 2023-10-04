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

  describe 'GET /groups/:group_id/requests' do
    let(:user) { create(:user) }
    let(:group) { create(:group) }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    context 'when user is authenticated' do
      before do
        post user_session_path,
             params: {
               user: {
                 email: user.email,
                 password: user.password
               }
             }
      end

      context 'when user is admin of the group' do
        before do
          group.members.create(user:, role: 'admin')
          create_list(:request, 2, group:)
          get group_requests_path(group), headers:
        end

        it 'returns all requests for the group' do
          expect(response).to have_http_status(:ok)

          json_response = response.parsed_body
          expect(json_response).to be_an(Array)
          expect(json_response.size).to eq(2)

          request = json_response.first
          expect(request).to include(
            'id' => be_a(Integer),
            'status' => 'pending',
            'reason' => be_a(String),
            'group_id' => group.id,
            'user_id' => be_a(Integer)
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
