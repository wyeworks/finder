require 'rails_helper'

RSpec.describe UsersController, type: :request do
  # Show
  describe 'GET /users/:id' do
    let(:user) { create :user, :with_social_networks }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    context 'when user is authenticated' do
      before do
        get user_path(user), headers:
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

    context 'when user is not authenticated' do
      before do
        get user_path(user)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user does not exist' do
      let(:non_existent_user_id) { User.maximum(:id).to_i + 1 }

      before do
        get user_path(non_existent_user_id), headers:
      end

      it 'returns http not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body
        expected_error = "No se pudo encontrar el usuario con el ID ##{non_existent_user_id}"
        expect(json_response['errors']['user']).to include(expected_error)
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

  # Careers
  describe 'GET /users/:id/careers' do
    let(:user) { create :user, :with_careers }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    context 'when user is authenticated' do
      before do
        get careers_user_path(user), headers:
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it "returns JSON containing user's careers data" do
        json_response = response.parsed_body

        expect(json_response[0]['id']).to be_a(Integer)
        expect(json_response[0]['name']).to be_a(String)
        expect(json_response[0]['code']).to be_a(String)
        expect(json_response[0]['approved_on']).to be_a(String)
        expect(json_response[0]['years']).to be_a(Integer)
        expect(json_response[0]['credits']).to be_a(Integer)
      end
    end

    context 'when user is not authenticated' do
      before do
        get careers_user_path(user)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Subjects
  describe 'GET /users/:id/subjects' do
    let(:user) { create :user, :with_subjects }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    context 'when user is authenticated' do
      before do
        get subjects_user_path(user), headers:
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it "returns JSON containing user's subjects data" do
        json_response = response.parsed_body

        expect(json_response[0]['id']).to be_a(Integer)
        expect(json_response[0]['name']).to be_a(String)
        expect(json_response[0]['code']).to be_a(String)
        expect(json_response[0]['credits']).to be_a(Integer)
      end
    end

    context 'when user is not authenticated' do
      before do
        get subjects_user_path(user)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Groups
  describe 'GET /users/:id/groups' do
    let(:user) { create :user, :with_groups }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    before do
      get groups_user_path(user), headers:
    end

    context 'when user is authenticated' do
      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it "returns JSON containing user's groups data" do
        json_response = response.parsed_body

        expect(json_response.size).to eq(2)
        group_ids = json_response.pluck('id')
        user_group_ids = user.groups.pluck(:id)
        expect(group_ids).to match_array(user_group_ids)
        expect(json_response[0]['id']).to be_a(Integer)
        expect(json_response[0]['name']).to be_a(String)
        expect(json_response[0]['description']).to be_a(String)
        expect(json_response[0]['size']).to be_a(Integer)
        expect(json_response[0]['time_preferences']).to be_a(Hash)
        expect(json_response[0]['subject_id']).to be_a(Integer)
        expect(json_response[0]['subject_name']).to be_a(String)
      end
    end

    context 'when user is not authenticated' do
      before do
        get groups_user_path(user)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
