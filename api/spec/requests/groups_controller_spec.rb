require 'rails_helper'

RSpec.describe GroupsController, type: :request do
  let(:user) { create(:user) }
  let(:group) { create(:group) }
  let(:valid_attributes) do
    {
      name: 'Study Group A',
      description: 'A study group for advanced topics',
      subject_id: create(:subject).id,
      size: 5,
      time_preferences: {
        'Monday' => 'Morning',
        'Tuesday' => 'Afternoon',
        'Wednesday' => 'Night',
        'Thursday' => 'None',
        'Friday' => 'Morning',
        'Saturday' => 'Afternoon',
        'Sunday' => 'Night'
      }
    }
  end
  let(:invalid_attributes) do
    {
      name: '',
      description: '',
      subject_id: nil,
      size: -1
    }
  end

  describe 'POST /groups' do
    let!(:user) { create(:user) }
    let!(:subject) { create(:subject) }
    let(:valid_attributes) { { name: 'Group Name', description: 'Group Description', subject_id: subject.id, size: 5 } }
    let(:invalid_attributes) { { name: '', description: '' } }

    context 'with valid parameters' do
      before do
        post user_session_path, params: { user: { email: user.email, password: user.password } }
        post groups_path, params: { group: valid_attributes },
                          headers: { 'Authorization' => response.headers['Authorization'] }
      end

      it 'creates a new Group' do
        expect(response).to have_http_status(:created)
        expect(Group.count).to eq(1)
      end

      it 'assigns the logged-in user as an admin member' do
        expect(Group.first.admin?(user)).to be true
      end

      it 'returns the created group data' do
        json_response = response.parsed_body
        expect(json_response['name']).to eq(valid_attributes[:name])
        expect(json_response['description']).to eq(valid_attributes[:description])
      end

      it 'returns a created status' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      before do
        post user_session_path, params: { user: { email: user.email, password: user.password } }
        post groups_path, params: { group: invalid_attributes },
                          headers: { 'Authorization' => response.headers['Authorization'] }
      end

      it 'does not create a new Group' do
        expect(Group.count).to eq(0)
      end

      it 'returns an error status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET /groups/:id' do
    let!(:group) { create(:group) }
    let!(:user) { create(:user) }

    context 'when the group exists' do
      before do
        get group_path(group.id)
      end

      it 'returns the group' do
        json_response = response.parsed_body
        expect(json_response['name']).to eq(group.name)
        expect(json_response['description']).to eq(group.description)
        expect(json_response['subject_id']).to eq(group.subject_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the group does not exist' do
      before do
        get group_path(-1)
      end

      it 'returns status code 404' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the user is authenticated' do
      before do
        post user_session_path, params: { user: { email: user.email, password: user.password } }
        get group_path(group.id), headers: { 'Authorization' => response.headers['Authorization'] }
      end

      it 'returns the group' do
        json_response = response.parsed_body
        expect(json_response['name']).to eq(group.name)
        expect(json_response['description']).to eq(group.description)
        expect(json_response['subject_id']).to eq(group.subject_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
