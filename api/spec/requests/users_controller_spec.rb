require 'rails_helper'

RSpec.describe UsersController, type: :request do
  # General
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  # Show
  describe 'GET /users/:id' do
    let(:user) { create :user, :with_social_networks, :with_careers, :with_subjects }

    before do
      get user_path(user), headers:
    end

    context 'when user is authenticated' do
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

      it "returns JSON containing user's careers data" do
        json_response = response.parsed_body['careers']

        expect(json_response[0]['id']).to be_a(Integer)
        expect(json_response[0]['name']).to be_a(String)
        expect(json_response[0]['code']).to be_a(String)
      end

      # Subjects
      it "returns JSON containing user's subjects data" do
        json_response = response.parsed_body['subjects']

        expect(json_response[0]['id']).to be_a(Integer)
        expect(json_response[0]['name']).to be_a(String)
      end
    end

    context 'when user is not authenticated' do
      before do
        get user_path(user)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Update
  describe 'PATCH /users/:id' do
    let!(:career) { create :career }
    let!(:subject) { create :subject }

    let(:user) { create :user }
    let(:update_params) do
      {
        name:,
        bio:,
        birth_date:,
        social_networks:,
        career_ids:,
        subject_ids:
      }
    end

    before do
      patch user_path(user.id), params: { user: update_params }, headers:
    end

    context 'with valid parameters' do
      let(:name) { 'New Name' }
      let(:bio) { 'New Bio' }
      let(:birth_date) { DateTime.parse('2000-01-01') }
      let(:social_networks) do
        {
          facebook: 'updated_facebook_link',
          instagram: 'updated_instagram_link'
        }
      end
      let(:career_ids) { [career.id] }
      let(:subject_ids) { [subject.id] }

      it 'successfully updates the user' do
        expect(response).to have_http_status(:ok)

        user.reload

        expect(user.name).to eq(name)
        expect(user.bio).to eq(bio)
        expect(user.birth_date).to eq(birth_date)
        expect(user.social_networks).to eq(social_networks.with_indifferent_access)
        expect(user.career_ids).to eq(career_ids)
        expect(user.subject_ids).to eq(subject_ids)
      end

      it "returns JSON containing the user's new data" do
        json_response = response.parsed_body

        expect(json_response['id']).to be_a(Integer)
        expect(json_response['email']).to eq(user.email)
        expect(json_response['name']).to eq(name)
        expect(json_response['bio']).to eq(bio)
        expect(DateTime.parse(json_response['birth_date'])).to eq(birth_date)
        expect(json_response['social_networks']).to eq(social_networks.with_indifferent_access)
      end
    end

    context 'with invalid parameters' do
      let(:name) { '' }
      let(:bio) { 'New Bio' }
      let(:birth_date) { DateTime.parse('2000-01-01') }
      let(:social_networks) { {} }
      let(:career_ids) { [] }
      let(:subject_ids) { [] }

      it 'returns an error status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns JSON containing error messages' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('El usuario no pudo ser actualizado correctamente')
        expect(json_response['errors']['name'][0]).to include('El nombre no puede ser vacío')
      end
    end
    context 'with password change' do
      let(:new_password) { 'ComplexPassword123!' }
      let(:update_params) do
        {
          current_password: user.password,
          password: new_password,
          password_confirmation: new_password
        }
      end

      it 'changes the user password successfully' do
        user.reload
        expect(user.valid_password?(new_password)).to be true
      end
    end

    context 'with invalid current password' do
      let(:new_password) { 'ComplexPassword123!' }
      let(:invalid_current_password) { 'invalidpassword' }
      let(:update_params) do
        {
          current_password: invalid_current_password,
          password: new_password,
          password_confirmation: new_password
        }
      end

      it 'returns an error status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not change the user password' do
        user.reload
        expect(user.valid_password?(user.password)).to be true
        expect(user.valid_password?(new_password)).to be false
      end

      it 'returns JSON containing error message for invalid current password' do
        json_response = response.parsed_body
        expect(json_response['errors']['current_password'][0]).to eq('La contraseña actual es incorrecta.')
      end
    end
  end

  # Destroy
  describe 'DELETE /users/:id' do
    let(:user) { create :user }

    context 'when user is authenticated' do
      let!(:group) { create :group }
      let(:headers) { { 'Authorization' => response.headers['Authorization'] } }

      before do
        # Authenticates user
        post user_session_path,
             params: {
               user: {
                 email: user.email,
                 password: user.password
               }
             }
      end

      context "when user is not any group's admin" do
        let!(:another_user) { create :user }

        before do
          create(:member, role: 'participant', group:, user:)
          create(:member, role: 'admin', group:, user: another_user)

          delete user_path(user.id), headers:
        end

        it 'deletes the user successfully, keeping the existing user as admin' do
          expect(User.count).to eq(1)
          expect(User.last).to eq(another_user)
          expect(Member.count).to eq(1)
          expect(Member.last.role).to eq('admin')
          expect(group.members.count).to eq(1)
        end
      end

      context "when user is the group's only admin and participant" do
        before do
          create(:member, role: 'admin', group:, user:)

          delete user_path(user.id), headers:
        end

        it 'deletes the user and the group successfully' do
          expect(User.count).to eq(0)
          expect(Member.count).to eq(0)
          expect(Group.count).to eq(0)
        end
      end

      context "when user is the group's only admin but there are more participants" do
        let!(:oldest_participant) do
          create :member,
                 role: 'participant',
                 group:,
                 created_at: 2.days.ago
        end
        let!(:newest_participant) do
          create :member,
                 role: 'participant',
                 group:,
                 created_at: 1.day.ago
        end

        context 'when successful' do
          before do
            create(:member, role: 'admin', group:, user:)

            delete user_path(user.id), headers:
          end

          it 'deletes the user successfully and oldest member gets promoted to admin' do
            expect(User.count).to eq(2)
            expect(group.members.count).to eq(2)

            expect(oldest_participant.reload.role).to eq('admin')
            expect(newest_participant.reload.role).to eq('participant')
          end
        end

        context "when there's an invalid record when trying to promote a member" do
          before do
            create(:member, role: 'admin', group:, user:)

            expect_any_instance_of(Group).to receive(:promote_oldest_member!)
              .and_raise(ActiveRecord::RecordInvalid)

            delete user_path(user.id), headers:
          end

          it 'returns an error status' do
            expect(response).to have_http_status(:unprocessable_entity)
          end

          it 'returns JSON containing error messages' do
            json_response = response.parsed_body

            expect(json_response['errors']['group'])
              .to include('No se pudo promover al participante más antiguo de uno de los grupos de este usuario')
          end
        end
      end

      context "when user is not the group's only admin" do
        let!(:another_user) { create :user }

        before do
          create(:member, role: 'admin', group:, user:)
          create(:member, role: 'admin', group:, user: another_user)

          delete user_path(user.id), headers:
        end

        it 'deletes the user successfully, keeping the existing user as admin' do
          expect(User.count).to eq(1)
          expect(User.last).to eq(another_user)
          expect(Member.count).to eq(1)
          expect(Member.last.role).to eq('admin')
          expect(group.members.count).to eq(1)
        end
      end

      context 'when trying to delete another user' do
        let(:another_user) { create :user }

        before do
          delete user_path(another_user.id), headers:
        end

        it 'returns http unauthorized' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'returns a not authorized message' do
          json_response = response.parsed_body
          expect(json_response['errors']['user'][0]).to eq('No estás autorizado para realizar esta acción')
        end
      end
    end

    context 'when user is not authenticated' do
      let(:headers) { {} }

      before do
        delete user_path(user.id), headers:
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response).to include('Tienes que registrarte o iniciar sesión antes de continuar')
      end
    end
  end
end
