require 'rails_helper'

RSpec.describe CareersController, type: :request do
  # Index
  describe 'GET /careers' do
    let(:user) { create(:user) }
    let(:careers) { create_list :career, 2 }

    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    before do
      get careers_path(careers), headers:
    end

    context 'when user is authenticated' do
      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it 'returns JSON containing all careers data' do
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
        get careers_path(careers)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
