require 'rails_helper'

RSpec.describe SessionsController, type: :request do
  describe 'GET /sessions/:id' do
    let(:session) { create(:session) }

    before do
      get session_path(session_id)
    end

    context 'when the session exists' do
      let(:session_id) { session.id }

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it 'returns JSON containing group data' do
        json_response = response.parsed_body

        expect(json_response['id']).to eq(session.id)
        expect(json_response['name']).to eq(session.name)
        expect(json_response['description']).to eq(session.description)
        expect(json_response['location']).to eq(session.location)
        expect(json_response['meeting_link']).to eq(session.meeting_link)
        expect(json_response['start_time']).to eq(session.start_time)
        expect(json_response['end_time']).to eq(session.end_time)
        expect(json_response['group_id']).to eq(session.group.id)
        expect(json_response['attendances']).to eq(session.attendances)
      end
    end

    context 'when the session does not exist' do
      let(:session_id) { -1 }

      it 'returns a not found response' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns JSON containing an error message' do
        json_response = response.parsed_body

        expect(json_response['message']).to eq('La sesión no existe')
      end
    end
  end
end
