require 'rails_helper'

RSpec.describe SubjectsController, type: :request do
  describe 'GET /subjects/:id' do
    let(:subject) { create :subject }

    before do
      get subject_path(subject)
    end

    it 'returns a successful response' do
      expect(response).to be_successful
    end

    it 'returns JSON containing subject data' do
      json_response = response.parsed_body

      expect(json_response['id']).to eq(subject.id)
      expect(json_response['name']).to eq(subject.name)
      expect(json_response['code']).to eq(subject.code)
      expect(json_response['credits']).to eq(subject.credits)
    end
  end
end
