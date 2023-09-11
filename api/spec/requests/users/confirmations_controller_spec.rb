require 'rails_helper'

RSpec.describe Users::ConfirmationsController, type: :request do
  describe 'GET #show' do
    let(:user) { create(:user, :with_confirmation_token) }

    context 'when the confirmation token is valid' do
      before do
        get user_confirmation_path(confirmation_token: user.confirmation_token)
      end

      it 'returns http found' do
        expect(response).to have_http_status(:found)
      end

      it 'confirms the user and updates confirmed_at' do
        expect(user.reload.confirmed_at).not_to be_nil
      end
    end

    context 'when the confirmation token is invalid' do
      before do
        get user_confirmation_path(confirmation_token: 'invalid_token')
      end

      it 'returns http found' do
        expect(response).to have_http_status(:found)
      end

      it 'does not confirm the user' do
        expect(user.reload.confirmed_at).to be_nil
      end
    end
  end
end
