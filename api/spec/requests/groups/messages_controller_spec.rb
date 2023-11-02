require 'rails_helper'

RSpec.describe 'Groups::MessagesController', type: :request do
  # General
  let(:user) { create :user }
  let(:group) { create :group }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  # Index
  describe 'GET /groups/:group_id/messages' do
    context 'when group does not exist' do
      before do
        get group_messages_path(group_id: -1), headers:
      end

      it 'returns not found status' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns an error message' do
        expect(response.parsed_body['errors']['group'])
          .to include('No se pudo encontrar el grupo con el ID #-1')
      end
    end

    context 'when user is authenticated' do
      let(:messages) { create_list(:message, 5, user:, group:) }

      context 'when user is a member of the group' do
        before do
          create :member, group:, user:, role: 'participant'

          get group_messages_path(group, messages), headers:
        end

        it 'returns a successful response' do
          expect(response).to be_successful
        end

        it 'returns JSON containing all messages from the group' do
          json_response = response.parsed_body

          expect(json_response[0]['id']).to be_a(Integer)
          expect(json_response[0]['content']).to be_a(String)
          expect(json_response[0]['hour']).to be_a(String)
          expect(json_response[0]['user_id']).to eq(user.id)
          expect(json_response[0]['group_id']).to eq(group.id)
          expect(json_response[0]['user_name']).to eq(user.name)
        end

        it 'returns the correct message content' do
          returned_messages = response.parsed_body
          messages.each_with_index do |message, index|
            expect(returned_messages[index]['content']).to eq(message.content)
          end
        end
      end

      context 'when user is not a member of the group' do
        before do
          get group_messages_path(group), headers:
        end

        it 'returns http unauthorized' do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        get group_messages_path(group)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Create
  describe 'POST /groups/:group_id/messages' do
    let(:message_params) { { content: 'Test message content' } }

    context 'when user is authenticated' do
      context 'when user is a member of the group' do
        before do
          create :member, group:, user:, role: 'participant'

          post group_messages_path(group), params: { message: message_params }, headers:
        end

        it 'creates a new message successfully' do
          expect(response).to have_http_status(:created)
          expect(Message.count).to eq(1)
        end

        it 'assigns the logged-in user as the message creator' do
          expect(Message.first.user).to eq(user)
        end

        it 'has the right content' do
          expect(Message.first.content).to eq('Test message content')
        end
      end

      context 'when user is not a member of the group' do
        before do
          post group_messages_path(group), params: { message: message_params }, headers:
        end

        it 'does not create a new message' do
          expect(Message.count).to eq(0)
        end

        it 'returns http unauthorized' do
          expect(response).to have_http_status(:unauthorized)
        end
      end

      context 'when there are validation errors' do
        let(:message_params) { { content: '' } }

        before do
          create :member, group:, user:, role: 'participant'

          post group_messages_path(group), params: { message: message_params }, headers:
        end

        it 'does not create a new message' do
          expect(Message.count).to eq(0)
        end

        it 'returns unprocessable entity status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to include('El mensaje no pudo ser creado correctamente')
          expect(json_response['errors']['content']).to include('El contenido del mensaje no puede ser vacío')
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        post group_messages_path(group), params: { message: message_params }
      end

      it 'does not create a new message' do
        expect(Message.count).to eq(0)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Update
  describe 'PATCH /groups/:group_id/messages/:id' do
    let(:message_params) { { content: 'Updated message content' } }

    context 'when user is one of the group\'s admin' do
      let(:message) { create :message, group: }

      before do
        create :member, group:, user:, role: 'admin'

        patch group_message_path(group, message), params: { message: message_params }, headers:
      end

      it 'updates the message successfully' do
        expect(response).to have_http_status(:ok)
        expect(message.reload.content).to eq('Updated message content')
      end
    end

    context 'when user is the message creator' do
      let(:message) { create :message, group:, user: }

      before do
        create :member, group:, user:, role: 'participant'

        patch group_message_path(group, message), params: { message: message_params }, headers:
      end

      it 'updates the message successfully' do
        expect(response).to have_http_status(:ok)
        expect(message.reload.content).to eq('Updated message content')
      end
    end

    context 'when user is not the message creator nor a group\'s admin' do
      let(:message) { create :message, group: }

      before do
        create :member, group:, user:, role: 'participant'

        patch group_message_path(group, message), params: { message: message_params }, headers:
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'does not update the message' do
        expect(message.reload.content).not_to eq('Updated message content')
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('No estás autorizado para realizar esta acción')
      end
    end

    context 'when there are validation errors' do
      let(:message_params) { { content: '' } }
      let(:message) { create :message, group:, user: }

      before do
        create :member, group:, user:, role: 'participant'

        patch group_message_path(group, message), params: { message: message_params }, headers:
      end

      it 'does not update the message' do
        expect(message.reload.content).not_to be_empty
      end

      it 'returns unprocessable entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns JSON containing error messages' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('El mensaje no pudo ser actualizado correctamente')
        expect(json_response['errors']['content']).to include('El contenido del mensaje no puede ser vacío')
      end
    end
  end

  # Destroy
  describe 'DELETE /groups/:group_id/messages/:id' do
    context 'when user is a member of the group and is the creator of the message' do
      let(:message) { create :message, group:, user: }

      before do
        create :member, group:, user:, role: 'participant'

        delete group_message_path(group, message), headers:
      end

      it 'deletes the message successfully' do
        expect(response).to have_http_status(:ok)
        expect(Message.exists?(message.id)).to be_falsey
      end
    end

    context 'when user destruction fails' do
      let(:message) { create :message, group:, user: }

      before do
        create :member, group:, user:, role: 'participant'

        allow_any_instance_of(Message).to receive(:destroy).and_return(false)

        delete group_message_path(group, message), headers:
      end

      it 'returns unprocessable entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not delete the message' do
        expect(Message.exists?(message.id)).to be_truthy
      end

      it 'returns JSON containing error messages' do
        json_response = response.parsed_body

        expect(json_response['errors']['message'])
          .to include("No se pudo eliminar el mensaje con el ID ##{message.id}")
      end
    end
  end
end
