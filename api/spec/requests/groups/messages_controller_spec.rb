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

  # Update
  describe 'PUT /groups/:group_id/messages/:id' do
    let(:new_content) { 'Updated message content' }

    context 'when user is authenticated' do
      before { headers }

      context 'when user is a member of the group and is the creator of the message' do
        before do
          group.members.create(user:, role: 'participant')
          put group_message_path(group, message), params: { message: { content: new_content } }, headers:
        end

        it 'updates the message successfully' do
          expect(response).to have_http_status(:ok)
          expect(message.reload.content).to eq(new_content)
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
end
