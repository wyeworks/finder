require 'rails_helper'

RSpec.describe Users::ConfirmationsController, type: :controller do
  include Devise::Test::ControllerHelpers

  describe 'GET #show' do
    let(:user) { create(:user, confirmed_at: nil) }

    context 'when the confirmation token is valid' do
      it 'confirms the user and updates confirmed_at' do
        @request.env['devise.mapping'] = Devise.mappings[:user]
        get :show, params: { confirmation_token: user.confirmation_token }

        user.reload
        expect(user.confirmed_at).not_to be_nil
      end
    end

    context 'when the confirmation token is invalid' do
      it 'does not confirm the user' do
        @request.env['devise.mapping'] = Devise.mappings[:user]
        get :show, params: { confirmation_token: 'invalid_token' }

        user.reload
        expect(user.confirmed_at).to be_nil
      end
    end
  end
end
