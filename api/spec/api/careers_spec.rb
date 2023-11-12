require 'swagger_helper'

RSpec.describe 'careers', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Index
  path '/careers' do
    get 'Returns all careers' do
      tags 'Careers'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      before do
        create_list(:career, 2)
      end

      response '200', 'Success' do
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('index_careers')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response[0]['id']).to be_a(Integer)
          expect(json_response[0]['name']).to be_a(String)
          expect(json_response[0]['code']).to be_a(String)
          expect(json_response[0]['approved_on']).to be_a(String)
          expect(json_response[0]['years']).to be_a(Integer)
          expect(json_response[0]['credits']).to be_a(Integer)
        end
      end
    end
  end
end
