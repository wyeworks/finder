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
          group.members.create(user:, role: 'participant') # Add user as a member only in this context
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
end
