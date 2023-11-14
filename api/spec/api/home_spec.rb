require 'swagger_helper'

RSpec.describe 'home', type: :request do
  # Index
  path '/' do
    get 'Returns application status' do
      tags 'Home'
      produces 'application/json'

      response '200', 'Success' do
        generate_swagger_response('index_home')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message']).to include('Still alive')
        end
      end
    end
  end
end
