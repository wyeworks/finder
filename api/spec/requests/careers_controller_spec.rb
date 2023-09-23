require 'rails_helper'

RSpec.describe CareersController, type: :request do
  describe 'GET /careers' do
    let(:careers) { create_list :career, 2 }

    before do
      get careers_path(careers)
    end

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
end
