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

  describe 'PATCH /users/signup' do
    let(:user) { create :user, :with_social_networks }
    let(:new_birth_date) { Date.parse('2023-08-13') }
    let(:new_bio) { 'hello1234' }
    let(:new_password) { 'ComplexPassword129!' }
    let(:new_social_networks) do
      {
        facebook: 'new_facebook_link',
        instagram: 'new_instagram_link'
      }
    end
    let(:new_career) { create :career }
    let(:new_subject) { create :subject }

    before do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      authorization_header = response.headers['Authorization']

      patch user_registration_path,
            params: {
              user: {
                password: new_password,
                birth_date: new_birth_date,
                bio: new_bio,
                social_networks: new_social_networks,
                career_ids: [new_career.id],
                subject_ids: [new_subject.id]
              }
            }.to_json,
            headers: {
              'Authorization' => authorization_header,
              'Content-Type' => 'application/json'
            }
    end

    context 'when user gets successfully updated' do
      it 'returns http success' do
        expect(response).to have_http_status(:ok)
      end

      it 'updates user details' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('El usuario fue actualizado correctamente')
        expect(json_response['user']['birth_date']).to eq(new_birth_date.to_s)
        expect(json_response['user']['bio']).to eq(new_bio)
        expect(json_response['user']['social_networks']).to eq(new_social_networks.with_indifferent_access)
        expect(json_response['user']['career_ids']).to include(new_career.id)
        expect(json_response['user']['subject_ids']).to include(new_subject.id)

        user.reload

        expect(user.birth_date).to eq(new_birth_date.to_s)
        expect(user.bio).to eq(new_bio)
        expect(user.social_networks).to eq(new_social_networks.with_indifferent_access)
        expect(user.careers).to include(new_career)
        expect(user.subjects).to include(new_subject)
      end

      it 'updates user password' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('El usuario fue actualizado correctamente')
        expect(user.reload.valid_password?(new_password)).to be true
      end
    end

    context "when user couldn't be updated successfully" do
      let(:new_password) { '123' }

      it 'returns http unprocessable entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('El usuario no pudo ser actualizado correctamente')
        expect(json_response['errors']['password'][0]).to include('La contraseña es demasiado corta')
        expect(json_response['errors']['password'][1])
          .to include('No se cumplen los requerimientos de complejidad de la contraseña')
      end
    end
  end
end
