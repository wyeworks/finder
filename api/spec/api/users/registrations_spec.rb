require 'swagger_helper'

RSpec.describe 'users::registrations', type: :request do
  # Signup
  path '/users/signup' do
    post 'Signup of a new user' do
      tags 'Devise'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          name: { type: :string }
        },
        required: ['user']
      }

      response '200', 'Success' do
        let(:email) { 'test_user@email.com' }
        let(:password) { 'Test#123' }
        let(:name) { 'Test User' }
        let(:user) { { user: { email:, password:, name: } } }

        generate_swagger_response('signup_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message']).to include('El usuario fue creado correctamente')
          expect(json_response['user']['email']).to eq(email)
          expect(json_response['user']['name']).to eq(name)
        end
      end
    end
  end
end
