require 'swagger_helper'

RSpec.describe 'users::sessions', type: :request do
  # Login
  path '/users/login' do
    post 'Login of a user' do
      tags 'Devise'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: ['user']
      }

      response '200', 'Success' do
        let!(:user_to_login) { create :user }
        let(:email) { user_to_login.email }
        let(:password) { user_to_login.password }
        let(:user) { { user: { email:, password: } } }

        generate_swagger_response('login_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message']).to include('Sesión iniciada correctamente')
          expect(json_response['user']['id']).to eq(user_to_login.id)
          expect(json_response['user']['email']).to eq(email)
          expect(json_response['user']['name']).to eq(user_to_login.name)
        end
      end
    end
  end

  # Logout
  path '/users/logout' do
    delete 'Logout of a user' do
      tags 'Devise'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: ['user']
      }

      response '200', 'Success' do
        let!(:user_to_logout) { create :user }
        let(:email) { user_to_logout.email }
        let(:password) { user_to_logout.password }
        let(:user) { { user: { email:, password: } } }

        let('Authorization') do
          post user_session_path, params: { user: { email: user_to_logout.email, password: user_to_logout.password } }

          response.headers['Authorization']
        end

        generate_swagger_response('logout_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message']).to include('Sesión cerrada correctamente')
        end
      end
    end
  end
end
