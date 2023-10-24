require 'rails_helper'

RSpec.describe GroupsController, type: :request do
  # General
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  # Index
  describe 'GET /groups' do
    let(:groups) { create_list :group, 2 }

    before do
      get groups_path(groups), headers:
    end

    context 'when user is authenticated' do
      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it 'returns JSON containing all groups data' do
        json_response = response.parsed_body

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
        get groups_path(groups)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when passing search and filter params' do
      let!(:group_one) do
        create :group,
               name: 'Foo',
               subject: subject_two,
               time_preferences: { 'Monday' => 'Night', 'Tuesday' => 'Afternoon', 'Wednesday' => 'Night' }
      end
      let!(:group_two) do
        create :group,
               name: 'Bar',
               subject: subject_one,
               time_preferences: { 'Monday' => 'Morning' }
      end
      let!(:group_three) do
        create :group,
               name: 'Baz',
               subject: subject_one,
               time_preferences: { 'Monday' => 'Night' }
      end

      let(:subject_one) { create :subject }
      let(:subject_two) { create :subject }

      before do
        create(:member, user:, group: group_three)

        get groups_path(groups),
            params: {
              name: 'ba',
              subject_id: subject_one.id.to_s,
              my_groups: 'true',
              time_preferences: 'night,afternoon'
            },
            headers:
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it 'returns JSON containing data from the groups that match the search params' do
        json_response = response.parsed_body

        expect(json_response[0]['id']).to be_a(Integer)
        expect(json_response[0]['name']).to eq(group_three.name)
        expect(json_response[0]['description']).to eq(group_three.description)
        expect(json_response[0]['size']).to eq(group_three.size)
        expect(json_response[0]['time_preferences']).to eq(group_three.time_preferences)
        expect(json_response[0]['subject_id']).to eq(group_three.subject_id)
        expect(json_response[0]['subject_name']).to eq(group_three.subject.name)
      end
    end
  end

  # Show
  describe 'GET /groups/:id' do
    let(:group) { create(:group) }
    let(:group_id) { group.id }

    before do
      get group_path(group_id), headers:
    end

    context 'when user is not authenticated' do
      context 'when the group exists' do
        it 'returns a successful response' do
          expect(response).to be_successful
        end

        it 'returns JSON containing group data' do
          json_response = response.parsed_body

          expect(json_response['id']).to eq(group.id)
          expect(json_response['name']).to eq(group.name)
          expect(json_response['description']).to eq(group.description)
          expect(json_response['size']).to eq(group.size)
          expect(json_response['time_preferences']).to eq(group.time_preferences)
          expect(json_response['subject_id']).to eq(group.subject_id)
          expect(json_response['subject_name']).to eq(group.subject.name)
        end
      end

      context 'when the group does not exist' do
        let(:group_id) { -1 }

        it 'returns http not found' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns JSON containing error message' do
          json_response = response.parsed_body

          expect(json_response['errors']['group']).to include("No se pudo encontrar el grupo con el ID ##{group_id}")
        end
      end
    end

    context 'when user is not authenticated' do
      before do
        get group_path(group_id)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Create
  describe 'POST /groups' do
    let(:subject) { create :subject }
    let(:group_params) do
      {
        name:,
        description:,
        size:,
        time_preferences:,
        subject_id:
      }
    end

    context 'when user is authenticated' do
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

        post groups_path, params: { group: group_params }, headers:
      end

      context 'with valid parameters' do
        let(:name) { 'Valid group name' }
        let(:description) { 'Description' }
        let(:size) { 5 }
        let(:subject_id) { subject.id }
        let(:time_preferences) do
          {
            'Monday' => 'Morning',
            'Tuesday' => 'Afternoon',
            'Wednesday' => 'Night',
            'Thursday' => 'None',
            'Friday' => 'Morning',
            'Saturday' => 'Afternoon',
            'Sunday' => 'Night'
          }
        end

        it 'creates Group successfully' do
          expect(response).to have_http_status(:created)

          expect(Group.count).to eq(1)
        end

        it 'assigns the logged-in user as an admin member' do
          expect(Group.first.admin?(user)).to be true
        end

        it 'returns JSON containing group data' do
          json_response = response.parsed_body

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['size']).to eq(size)
          expect(json_response['time_preferences']).to eq(time_preferences)
          expect(json_response['subject_id']).to eq(subject_id)
        end
      end

      context 'with invalid parameters' do
        let(:name) { '' }
        let(:description) { 'Description' }
        let(:size) { nil }
        let(:subject_id) { nil }
        let(:time_preferences) { nil }

        it 'does not create a new Group' do
          expect(Group.count).to eq(0)
        end

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to include('El grupo no pudo ser creado correctamente')
          expect(json_response['errors']['name'][0]).to include('El nombre del grupo no puede ser vacío')
          expect(json_response['errors']['size'][0]).to include('El grupo debe tener una cantidad especificada')
          expect(json_response['errors']['size'][1]).to include('La cantidad debe ser un número')
          expect(json_response['errors']['subject'][0])
            .to include('El grupo debe estar asociado a al menos una materia')
        end
      end
    end

    context 'when user is not authenticated' do
      let(:headers) { {} }
      let(:group_params) do
        {
          name: 'Group name',
          subject_id: subject.id
        }
      end

      before do
        post groups_path, params: { group: group_params }, headers:
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

  # Update
  describe 'PATCH /groups/:id' do
    let(:subject) { create :subject }
    let(:group) { create :group }
    let(:group_params) do
      {
        name:,
        description:,
        size:,
        time_preferences:,
        subject_id:
      }
    end
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

    context "when user is the group's admin" do
      before do
        create(:member, role: 'admin', user:, group:)

        patch group_path(group.id), params: { group: group_params }, headers:
      end

      context 'with valid parameters' do
        let(:name) { 'Valid group name' }
        let(:description) { 'Description' }
        let(:size) { 5 }
        let(:subject_id) { subject.id }
        let(:time_preferences) do
          {
            'Monday' => 'Morning',
            'Tuesday' => 'Afternoon',
            'Wednesday' => 'Night',
            'Thursday' => 'None',
            'Friday' => 'Morning',
            'Saturday' => 'Afternoon',
            'Sunday' => 'Night'
          }
        end

        it 'updates Group successfully' do
          expect(response).to have_http_status(:ok)

          group.reload

          expect(group.name).to eq(name)
          expect(group.description).to eq(description)
          expect(group.size).to eq(size)
          expect(group.time_preferences).to eq(time_preferences)
          expect(group.subject_id).to eq(subject_id)
        end

        it 'returns JSON containing new group data' do
          json_response = response.parsed_body

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['size']).to eq(size)
          expect(json_response['time_preferences']).to eq(time_preferences)
          expect(json_response['subject_id']).to eq(subject_id)
        end
      end

      context 'with invalid parameters' do
        let(:name) { '' }
        let(:description) { 'Description' }
        let(:size) { nil }
        let(:subject_id) { nil }
        let(:time_preferences) { nil }

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to include('El grupo no pudo ser actualizado correctamente')
          expect(json_response['errors']['name'][0]).to include('El nombre del grupo no puede ser vacío')
          expect(json_response['errors']['size'][0]).to include('El grupo debe tener una cantidad especificada')
          expect(json_response['errors']['size'][1]).to include('La cantidad debe ser un número')
          expect(json_response['errors']['subject'][0])
            .to include('El grupo debe estar asociado a al menos una materia')
        end
      end
    end

    context "when user is not the group's admin" do
      let(:group_params) do
        {
          name: 'Group name',
          subject_id: subject.id
        }
      end

      before do
        create(:member, role: 'participant', user:, group:)

        patch group_path(group.id), params: { group: group_params }, headers:
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['errors']['group'])
          .to include("El usuario con ID ##{user.id} no es administrador de este grupo")
      end
    end
  end

  # Destroy
  describe 'DELETE /groups/:id' do
    let(:group) { create :group }
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

    context "when user is the group's admin" do
      before do
        create(:member, role: 'admin', user:, group:)

        delete group_path(group.id), headers:
      end

      it 'deletes Group successfully' do
        expect(Group.count).to eq(0)
      end
    end

    context "when user is not the group's admin" do
      before do
        create(:member, role: 'participant', user:, group:)

        delete group_path(group.id), headers:
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['errors']['group'])
          .to include("El usuario con ID ##{user.id} no es administrador de este grupo")
      end
    end
  end

  # Members
  describe 'GET /groups/:id/members' do
    let(:creator) { create(:user) }
    let(:group) { create(:group, :with_members) }
    let(:headers) { { 'Authorization' => response.headers['Authorization'] } }

    before do
      group.members.create(user: creator, role: 'admin')
      post user_session_path,
           params: {
             user: {
               email: creator.email,
               password: creator.password
             }
           }
      get members_group_path(group.id), headers:
    end

    it 'returns a successful response' do
      expect(response).to be_successful
    end

    it 'returns JSON containing the creator as the only member' do
      json_response = response.parsed_body
      expect(json_response.size).to eq(3)
      expect(json_response[0]['member_id']).to be_a(Integer)
      expect(json_response[0]['id']).to be_a(Integer)
      expect(json_response[0]['email']).to be_a(String)
    end
  end
end
