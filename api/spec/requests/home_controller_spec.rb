require 'rails_helper'

RSpec.describe HomeController, type: :request do
  # Index
  describe 'GET /' do
    before do
      get root_path, headers:
    end

    it 'returns a successful response' do
      expect(response).to be_successful
    end
  end
end
