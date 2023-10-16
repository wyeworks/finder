require 'rails_helper'

RSpec.describe HomeController, type: :request do
  # Index
  describe 'GET /' do
    let(:user) { create(:user) }
    let(:headers) do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    before do
      get root_path, headers:
    end

    it 'returns a successful response' do
      expect(response).to be_successful
    end
  end
end
