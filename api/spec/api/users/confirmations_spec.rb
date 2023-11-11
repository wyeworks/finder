require 'swagger_helper'

RSpec.describe 'users::confirmations', type: :request do
  # Show
  path '/users/confirmation' do
    get 'Finds a user with their confirmation token' do
      tags 'Devise'
      produces 'application/json'
      parameter name: :confirmation_token, in: :query, type: :string, value: 'Token'

      response '302', 'Found' do
        let(:user) { create :user, :with_confirmation_token }
        let(:confirmation_token) { user.confirmation_token }

        run_test!
      end
    end
  end
end
