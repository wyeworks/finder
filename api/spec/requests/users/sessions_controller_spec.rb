require 'rails_helper'

RSpec.describe Users::SessionsController, type: :request do
  describe 'POST /users/login' do
    let!(:user) { create :user, password: 'CorrectPassword#123' }

    before do
      post user_session_path,
           params: {
             user: {
               email: user.email,
               password:
             }
           }
    end

    context 'when user gets successfully logged in' do
      let(:password) { 'CorrectPassword#123' }

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns JSON containing user data' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('Sesión iniciada correctamente')
        expect(json_response['user']['email']).to eq(user.email)
        expect(json_response['user']['name']).to eq(user.name)
      end
    end

    context "when user couldn't be authenticated" do
      let(:password) { 'WrongPassword#123' }

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response).to include('Email y/o contraseña inválidos')
      end
    end

    context 'when user is not confirmed' do
      let!(:unconfirmed_user) { create :user, password: 'CorrectPassword#123', confirmed_at: nil }
      let(:password) { 'CorrectPassword#123' }

      before do
        post user_session_path,
             params: {
               user: {
                 email: unconfirmed_user.email,
                 password:
               }
             }
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body
        expect(json_response).to include('Tienes que confirmar tu cuenta antes de continuar')
      end
    end
  end

  describe 'DELETE /users/logout' do
    let!(:user) { create :user }

    context 'when user gets successfully logged out' do
      let(:headers) { { 'Authorization' => response.headers['Authorization'] } }

      before do
        post user_session_path,
             params: {
               user: {
                 email: user.email,
                 password: user.password
               }
             }

        delete destroy_user_session_path, headers:
      end

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns JSON containing success message' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('Sesión cerrada correctamente')
      end
    end

    context 'when cannot find active session' do
      let(:headers) { {} }

      before do
        delete destroy_user_session_path, headers:
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('No se pudo encontrar una sesión activa')
      end
    end
  end
end
