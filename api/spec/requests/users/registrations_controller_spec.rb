require 'rails_helper'

RSpec.describe UsersController, type: :request do
  describe 'GET /users/:id' do
    let(:user) { create :user, :with_social_networks }

    before do
      get user_path(user)
    end

    it 'returns a successful response' do
      expect(response).to be_successful
    end

    it 'returns JSON containing user data' do
      json_response = response.parsed_body

      expect(json_response['id']).to eq(user.id)
      expect(json_response['email']).to eq(user.email)
      expect(json_response['name']).to eq(user.name)
      expect(DateTime.parse(json_response['birth_date'])).to eq(user.birth_date)
      expect(json_response['social_networks']).to eq(user.social_networks)
    end
  end

  describe 'PATCH /users/signup' do
    let(:user) { create(:user) }
    let(:new_birth_date) { Date.parse('2023-08-13') }
    let(:new_bio) { 'hello1234' }
    let(:new_password) { 'ComplexPassword129!' }

    before do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      authorization_header = response.headers['Authorization']

      patch user_registration_path,
            params: {
              user: {
                birth_date: new_birth_date,
                bio: new_bio,
                password: new_password,
                password_confirmation: new_password
              }
            }.to_json,
            headers: {
              'Authorization' => authorization_header,
              'Content-Type' => 'application/json'
            }
    end

    context 'when user updates details successfully' do
      it 'returns http success' do
        expect(response).to have_http_status(:ok)
      end

      it 'updates user details' do
        json_response = response.parsed_body
        expect(json_response['user']['birth_date']).to eq(new_birth_date.to_s)
        expect(json_response['user']['bio']).to eq(new_bio)
      end

      it 'updates user password' do
        expect(user.reload.valid_password?(new_password)).to be true
      end
    end

    context 'when user update fails' do
      let(:new_password) { '123' }

      it 'returns http unprocessable entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body
        expect(json_response['message']).to include("User couldn't be updated successfully")
      end
    end
  end
end
