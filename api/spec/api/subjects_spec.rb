require 'swagger_helper'

RSpec.describe 'subjects', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Index
  path '/subjects' do
    get 'Returns all subjects' do
      tags 'Subjects'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      before do
        create_list(:subject, 2)
      end

      response '200', 'Success' do
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('index_subjects')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response[0]['id']).to be_a(Integer)
          expect(json_response[0]['name']).to be_a(String)
          expect(json_response[0]['code']).to be_a(String)
          expect(json_response[0]['credits']).to be_a(Integer)
        end
      end
    end
  end

  # Show
  path '/subjects/{id}' do
    get 'Returns a subject' do
      tags 'Subjects'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Subject ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:subject) { create(:subject) }
        let(:id) { subject.id }
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('show_subjects')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(subject.id)
          expect(json_response['name']).to eq(subject.name)
          expect(json_response['code']).to eq(subject.code)
          expect(json_response['credits']).to eq(subject.credits)
        end
      end
    end
  end
end
