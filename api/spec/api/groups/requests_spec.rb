require 'swagger_helper'

RSpec.describe 'groups::requests', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Index
  path '/groups/{id}/requests' do
    get 'Returns all requests of a specific group' do
      tags 'Requests'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group, :with_requests }
        let(:id) { group.id }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('index_requests')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response[0]['id']).to be_a(Integer)
          expect(json_response[0]['status']).to eq(group.requests.first.status)
          expect(json_response[0]['reason']).to eq(group.requests.first.reason)
          expect(json_response[0]['group_id']).to eq(group.requests.first.group_id)
          expect(json_response[0]['user_id']).to eq(group.requests.first.user_id)
          expect(json_response[0]['user_name']).to eq(group.requests.first.user.name)
          expect(json_response[0]['user_email']).to eq(group.requests.first.user.email)
        end
      end
    end
  end

  # Create
  path '/groups/{id}/requests' do
    post 'Creates a request' do
      tags 'Requests'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '201', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }

        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('create_requests')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['status']).to eq('pending')
          expect(json_response['reason']).to be_nil
          expect(json_response['group_id']).to eq(group.id)
          expect(json_response['user_id']).to eq(user.id)
          expect(json_response['user_name']).to eq(user.name)
          expect(json_response['user_email']).to eq(user.email)
        end
      end
    end
  end

  # Update
  path '/groups/{id}/requests/{request_id}' do
    patch 'Updates a request' do
      tags 'Requests'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: :request_id, in: :path, type: :integer, required: true, description: 'Request ID'
      parameter name: :request, in: :body, schema: {
        type: :object,
        properties: {
          status: { type: :string },
          reason: { type: :string }
        },
        required: ['request']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }
        let(:request_to_update) { create :request, group: }
        let(:request_id) { request_to_update.id }

        let(:status) { 'rejected' }
        let(:reason) { 'Not a fit for the group' }
        let(:request) { { status:, reason: } }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('update_requests')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(request_to_update.id)
          expect(json_response['status']).to eq(status)
          expect(json_response['reason']).to eq(reason)
          expect(json_response['group_id']).to eq(group.id)
          expect(json_response['user_id']).to eq(request_to_update.user_id)
          expect(json_response['user_name']).to eq(request_to_update.user.name)
          expect(json_response['user_email']).to eq(request_to_update.user.email)
        end
      end
    end
  end

  # Show for user
  path '/groups/{id}/requests/users/{user_id}' do
    get 'Returns a user request for a specific group' do
      tags 'Requests'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: :user_id, in: :path, type: :integer, required: true, description: 'User ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }
        let(:user_to_show) { create :user }
        let(:user_id) { user_to_show.id }
        let!(:request) { create :request, group:, user: user_to_show }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('show_user_requests')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(request.id)
          expect(json_response['status']).to eq(request.status)
          expect(json_response['reason']).to eq(request.reason)
          expect(json_response['group_id']).to eq(group.id)
          expect(json_response['user_id']).to eq(user_to_show.id)
          expect(json_response['user_name']).to eq(user_to_show.name)
          expect(json_response['user_email']).to eq(user_to_show.email)
        end
      end
    end
  end
end
