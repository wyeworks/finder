require 'swagger_helper'

RSpec.describe 'users::passwords', type: :request do
  # Create
  path '/users/password' do
    post 'Creates a recover password request' do
      tags 'Devise'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string }
        },
        required: ['user']
      }

      response '200', 'Success' do
        let!(:user_for_reset_password) { create :user }
        let(:email) { user_for_reset_password.email }
        let(:user) { { user: { email: } } }

        generate_swagger_response('create_password_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message'])
            .to include('Si tu correo electrónico existe en nuestra base de datos')
        end
      end
    end
  end

  # Update
  path '/users/password' do
    patch 'Updates a user password' do
      tags 'Devise'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          reset_password_token: { type: :string },
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string }
        },
        required: ['user']
      }

      response '200', 'Success' do
        let(:token) { Devise.token_generator.generate(User, :reset_password_token) }
        let(:raw_token) { token.first }
        let(:hashed_token) { token.last }

        let!(:user_for_reset_password) do
          create :user, reset_password_token: hashed_token, reset_password_sent_at: Time.now.utc
        end

        let(:reset_password_token) { raw_token }
        let(:email) { user_for_reset_password.email }
        let(:password) { 'NewPassword#123' }
        let(:password_confirmation) { 'NewPassword#123' }
        let(:user) do
          {
            user: {
              reset_password_token:,
              email:,
              password:,
              password_confirmation:
            }
          }
        end

        generate_swagger_response('update_password_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message']).to include('Contraseña reestablecida correctamente')
        end
      end
    end
  end
end
