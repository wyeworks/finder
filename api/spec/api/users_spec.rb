require 'swagger_helper'

RSpec.describe 'users', type: :request do
  # Authorization
  let(:user) { create :user, :with_social_networks, :with_careers, :with_subjects }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Show
  path '/users/{id}' do
    get 'Returns a user' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'User ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:id) { user.id }
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('show_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(user.id)
          expect(json_response['email']).to eq(user.email)
          expect(json_response['name']).to eq(user.name)
          expect(DateTime.parse(json_response['birth_date'])).to eq(user.birth_date)
          expect(json_response['social_networks']).to eq(user.social_networks)

          expect(json_response['careers'][0]['id']).to eq(user.careers.first.id)
          expect(json_response['careers'][0]['code']).to eq(user.careers.first.code)
          expect(json_response['careers'][0]['name']).to eq(user.careers.first.name)

          expect(json_response['subjects'][0]['id']).to eq(user.subjects.first.id)
          expect(json_response['subjects'][0]['code']).to eq(user.subjects.first.code)
          expect(json_response['subjects'][0]['name']).to eq(user.subjects.first.name)
        end
      end
    end
  end

  # Update
  path '/users/{id}' do
    patch 'Updates a user' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'User ID'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          bio: { type: :string },
          birth_date: { type: :string },
          social_networks: { type: :object },
          career_ids: { type: :array, items: { type: :integer } },
          subject_ids: { type: :array, items: { type: :integer } }
        },
        required: ['user']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:user_to_update) { create :user }
        let(:id) { user_to_update.id }
        let(:name) { 'New Name' }
        let(:bio) { 'New Bio' }
        let(:birth_date) { DateTime.parse('2000-01-01') }
        let(:social_networks) do
          {
            facebook: 'updated_facebook_link',
            instagram: 'updated_instagram_link'
          }
        end
        let(:career_ids) { [] }
        let(:subject_ids) { [] }
        let(:user) do
          {
            name:,
            bio:,
            birth_date:,
            social_networks:,
            career_ids:,
            subject_ids:
          }
        end
        let(:headers) do
          post user_session_path, params: {
            user: {
              email: user_to_update.email,
              password: user_to_update.password
            }
          }

          response.headers
        end
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('update_users')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(user_to_update.id)
          expect(json_response['email']).to eq(user_to_update.email)
          expect(json_response['name']).to eq(name)
          expect(json_response['bio']).to eq(bio)
          expect(DateTime.parse(json_response['birth_date'])).to eq(birth_date)
          expect(json_response['social_networks']).to eq(social_networks.with_indifferent_access)
          expect(json_response['careers']).to eq([])
          expect(json_response['subjects']).to eq([])
        end
      end
    end
  end

  # Destroy
  path '/users/{id}' do
    delete 'Deletes a user' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'User ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '204', 'Success' do
        let(:id) { user.id }
        let('Authorization') do
          headers['Authorization']
        end

        run_test!
      end
    end
  end
end
