require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :request do
  describe 'POST /users/signup' do
    let(:email) { 'test_user@email.com' }
    let(:name) { 'Test User' }
    let(:birth_date) { '2023-09-01T00:00:00' }

    before do
      post user_registration_path,
           params: {
             user: {
               email:,
               password:,
               name:,
               birth_date:
             }
           }
    end

    context 'when user gets successfully created' do
      let(:password) { 'Test#123' }

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns JSON containing user data' do
        json_response = response.parsed_body

        expect(json_response['user']['email']).to eq(email)
        expect(json_response['user']['name']).to eq(name)
      end
    end

    context "when user couldn't be created successfully" do
      let(:password) { '123' }

      it 'returns http unprocessable entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['message']).to include("User couldn't be created successfully")
        expect(json_response['errors']['password'][0]).to include('is too short')
        expect(json_response['errors']['password'][1]).to include('Complexity requirement not met')
      end
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
