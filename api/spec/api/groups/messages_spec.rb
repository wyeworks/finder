require 'swagger_helper'

RSpec.describe 'groups::messages', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Index
  path '/groups/{id}/messages' do
    get 'Returns all messages of a specific group' do
      tags 'Messages'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group, :with_messages }
        let(:id) { group.id }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('index_messages')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response[0]['date']).to be_a(String)
          expect(json_response[0]['messages'][0]['id']).to be_a(Integer)
          expect(json_response[0]['messages'][0]['content']).to be_a(String)
          expect(json_response[0]['messages'][0]['created_at']).to be_a(String)
          expect(json_response[0]['messages'][0]['user_id']).to be_a(Integer)
          expect(json_response[0]['messages'][0]['group_id']).to be_a(Integer)
          expect(json_response[0]['messages'][0]['user_name']).to be_a(String)
        end
      end
    end
  end

  # Create
  path '/groups/{id}/messages' do
    post 'Creates a message' do
      tags 'Messages'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'
      parameter name: :message, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string }
        },
        required: ['message']
      }

      response '201', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }
        let(:content) { 'Foo' }
        let(:message) { { content: } }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('create_messages')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['content']).to eq(content)
          expect(json_response['created_at']).to be_a(String)
          expect(json_response['user_id']).to eq(user.id)
          expect(json_response['group_id']).to eq(group.id)
          expect(json_response['user_name']).to eq(user.name)
        end
      end
    end
  end

  # Update
  path '/groups/{id}/messages/{message_id}' do
    patch 'Updates a message' do
      tags 'Messages'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: :message_id, in: :path, type: :integer, required: true, description: 'Message ID'
      parameter name: :message, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string }
        },
        required: ['message']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }
        let(:message_to_update) { create :message, group: }
        let(:message_id) { message_to_update.id }
        let(:content) { 'New Content' }
        let(:message) { { content: } }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('update_messages')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(message_to_update.id)
          expect(json_response['content']).to eq(content)
          expect(json_response['created_at']).to be_a(String)
          expect(json_response['user_id']).to eq(message_to_update.user_id)
          expect(json_response['group_id']).to eq(message_to_update.group_id)
          expect(json_response['user_name']).to eq(message_to_update.user.name)
        end
      end
    end
  end

  # Destroy
  path '/groups/{id}/messages/{message_id}' do
    delete 'Deletes a message' do
      tags 'Messages'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: :message_id, in: :path, type: :integer, required: true, description: 'Message ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }
        let(:message) { create :message, group: }
        let(:message_id) { message.id }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('delete_messages')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['success']).to include('El mensaje fue eliminado exitosamente')
        end
      end
    end
  end
end
