require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :request do
  describe 'POST /users/signup' do
    let(:email) { 'test_user@email.com' }
    let(:name) { 'Test User' }

    before do
      post user_registration_path,
           params: {
             user: {
               email:,
               password:,
               name:
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

        expect(json_response['message']).to include('El usuario fue creado correctamente')
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

        expect(json_response['message']).to include('El usuario no pudo ser creado correctamente')
        expect(json_response['errors']['password'][0]).to include('La contraseña es demasiado corta')
        expect(json_response['errors']['password'][1])
          .to include('No se cumplen los requerimientos de complejidad de la contraseña')
      end
    end
  end
end
