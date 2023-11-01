require 'rails_helper'

RSpec.describe 'Groups::MessagesController', type: :request do
  let(:user) { create :user }
  let(:group) { create :group }
  let(:message) { create :message, user:, group: }

  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  # Create
  describe 'POST /groups/:group_id/messages' do
    context 'when user is authenticated' do
      before { headers }

      context 'when user is a member of the group' do
        before do
          group.members.create(user:, role: 'participant')
          post group_messages_path(group), params: { message: { content: 'Test message content' } }, headers:
        end

        it 'creates a new message successfully' do
          expect(response).to have_http_status(:created)
          expect(Message.count).to eq(1)
        end

        it 'assigns the logged-in user as the message creator' do
          expect(Message.first.user).to eq(user)
        end
      end

      context 'when user is not a member of the group' do
        before do
          post group_messages_path(group), params: { message: { content: 'Test message content' } }, headers:
        end

        it 'does not create a new message' do
          expect(Message.count).to eq(0)
        end

        it 'returns forbidden status' do
          expect(response).to have_http_status(:forbidden)
        end
      end
    end

    context 'when user is authenticated and message creation fails' do
      before do
        group.members.create(user:, role: 'participant')
        headers
        post group_messages_path(group), params: { message: { content: '' } }, headers:
      end

      it 'does not create a new message' do
        expect(Message.count).to eq(0)
      end

      it 'returns unprocessable entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns the error messages' do
        error_response = response.parsed_body
        expect(error_response).to have_key('content')
      end
    end

    context 'when user is not authenticated' do
      before do
        post group_messages_path(group), params: { message: { content: 'Test message content' } }
      end

      it 'does not create a new message' do
        expect(Message.count).to eq(0)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Index
  describe 'GET /groups/:group_id/messages' do
    let!(:messages) { create_list(:message, 5, user:, group:) } # Create 5 messages

    context 'when user is authenticated' do
      before { headers }

      context 'when user is a member of the group' do
        before do
          group.members.create(user:, role: 'participant')
          get group_messages_path(group), headers:
        end

        it 'returns a list of messages' do
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body.size).to eq(5) # por tirar
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

        it 'does not return the messages' do
          expect(response).to have_http_status(:forbidden)
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        get group_messages_path(group)
      end

      it 'does not return the messages' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Update
  describe 'PUT /groups/:group_id/messages/:id' do
    let(:new_content) { 'Updated message content' }

    context 'when user is authenticated' do
      before { headers }

      context 'when update fails' do
        before do
          group.members.create(user:, role: 'participant')
          allow_any_instance_of(Message).to receive(:update).and_return(false)
          put group_message_path(group, message), params: { message: { content: new_content } }, headers:
        end

        it 'returns unprocessable entity status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns the error messages' do
          expect(response.parsed_body['errors']).to have_key('message')
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        put group_message_path(group, message), params: { message: { content: new_content } }
      end

      it 'does not update the message' do
        expect(message.reload.content).not_to eq(new_content)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # set_gorup
  describe 'GET /groups/:group_id/messages' do
    context 'when group does not exist' do
      before do
        get group_messages_path(group_id: -1), headers:
      end

      it 'returns not found status' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns an error message' do
        expect(response.parsed_body['errors']['group']).to include('No se pudo encontrar el grupo con el ID #-1')
      end
    end
  end

  # ensure_correct_user_or_admin

  describe 'PUT /groups/:group_id/messages/:id' do
    let(:new_content) { 'Updated message content' } # Define new_content here

    let(:other_user) { create :user }
    let(:other_headers) do
      post user_session_path, params: { user: { email: other_user.email, password: other_user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    context 'when user is not the creator of the message nor an admin' do
      before do
        group.members.create(user: other_user, role: 'participant')
        put group_message_path(group, message), params: { message: { content: new_content } }, headers: other_headers
      end

      it 'does not update the message' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  # Destroy
  describe 'DELETE /groups/:group_id/messages/:id' do
    context 'when user is authenticated' do
      before { headers }

      context 'when user is a member of the group and is the creator of the message' do
        before do
          group.members.create(user:, role: 'participant')
          delete group_message_path(group, message), headers:
        end

        it 'deletes the message successfully' do
          expect(response).to have_http_status(:ok)
          expect(Message.exists?(message.id)).to be_falsey
        end
      end

      context 'when destruction fails' do
        before do
          group.members.create(user:, role: 'participant')
          allow_any_instance_of(Message).to receive(:destroy).and_return(false)
          allow(Rails.logger).to receive(:error)
          delete group_message_path(group, message), headers:
        end

        it 'logs an error' do
          expect(Rails.logger).to have_received(:error).with("Failed to destroy Message with ID ##{message.id}.")
        end

        it 'returns unprocessable entity status' do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.parsed_body['errors']['message']).to include(
            "No se pudo eliminar el mensaje con el ID ##{message.id}"
          )
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        delete group_message_path(group, message)
      end

      it 'does not delete the message' do
        expect(Message.exists?(message.id)).to be_truthy
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
