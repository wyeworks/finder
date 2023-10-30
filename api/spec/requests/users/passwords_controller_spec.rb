require 'rails_helper'

RSpec.describe Users::PasswordsController, type: :request do
  describe 'POST #create' do
    let(:user) { create(:user) }

    context 'when the email is valid' do
      before do
        post user_password_path, params: { user: { email: user.email } }
      end

      it 'returns http success' do
        expect(response).to have_http_status(:ok)
      end

      it 'sends reset password instructions to the user' do
        expect(user.reload.reset_password_token).not_to be_nil
        expect(user.reload.reset_password_sent_at).not_to be_nil
      end
    end

    context 'when the email is invalid' do
      before do
        post user_password_path, params: { user: { email: 'invalid_email@example.com' } }
      end

      it 'returns http unprocessable_entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not send reset password instructions' do
        expect(user.reload.reset_password_token).to be_nil
        expect(user.reload.reset_password_sent_at).to be_nil
      end
    end
  end

  describe 'PUT #update' do
    let(:user) { create(:user) }
    let(:new_password) { 'NewPassword123!' }

    context 'when the reset password token is valid' do
      before do
        raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
        user.reset_password_token = hashed_token
        user.reset_password_sent_at = Time.now.utc
        user.save!

        put user_password_path, params: {
          user: {
            reset_password_token: raw_token,
            password: new_password,
            password_confirmation: new_password,
            email: user.email
          }
        }
      end

      it 'returns http success' do
        expect(response).to have_http_status(:ok)
      end

      it 'updates the user password' do
        expect(user.reload.valid_password?(new_password)).to be_truthy
      end
    end

    context 'when the reset password token is invalid' do
      before do
        put user_password_path, params: {
          user: {
            reset_password_token: 'invalid_token',
            password: new_password,
            password_confirmation: new_password
          }
        }
      end

      it 'returns http unprocessable_entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the user password' do
        expect(user.reload.valid_password?(new_password)).to be_falsy
      end
    end
  end
end
