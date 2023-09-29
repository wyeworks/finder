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

  describe 'GET /users/:id/careers' do
    let(:user) { create :user }

    before do
      create_list(:career, 2, users: [user])

      get careers_user_path(user)
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

  describe 'GET /users/:id/subjects' do
    let(:user) { create :user }

    before do
      create_list(:subject, 2, users: [user])

      get subjects_user_path(user)
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
end
