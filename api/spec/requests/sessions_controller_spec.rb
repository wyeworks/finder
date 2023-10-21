require 'rails_helper'

RSpec.describe SessionsController, type: :request do
  # General
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  # Show
  describe 'GET /sessions/:id' do
    let(:session) { create :session }
    let(:session_id) { session.id }

    before do
      get session_path(session_id), headers:
    end

    context 'when the user is authenticated' do
      context 'when the session exists' do
        it 'returns a successful response' do
          expect(response).to be_successful
        end
        it 'returns JSON containing session data' do
          json_response = response.parsed_body

          expected_attendances = session.attendances.map do |attendance|
            {
              'id' => attendance.id,
              'session_id' => attendance.session_id,
              'status' => attendance.status,
              'created_at' => attendance.created_at.utc.iso8601(3),
              'updated_at' => attendance.updated_at.utc.iso8601(3),
              'member_id' => attendance.member_id
            }
          end

          expect(json_response['attendances']).to match_array(expected_attendances)
        end
      end

      context 'when the session does not exist' do
        let(:session_id) { -1 }

        it 'returns a not found response' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns JSON containing an error message' do
          json_response = response.parsed_body

          expect(json_response['message']).to eq("No se pudo encontrar la sesion con el ID ##{session_id}")
        end
      end
    end
    context 'when user is not authenticated' do
      before do
        get session_path(session_id)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # Create
  describe 'POST /sessions' do
    let!(:group) { create :group }
    let!(:member) { create(:member, user:, group:) }

    let(:session_params) do
      {
        name:,
        description:,
        location:,
        meeting_link:,
        start_time:,
        end_time:,
        group_id:
      }
    end

    context 'when de user is authenticated' do
      before do
        post sessions_path, params: { session: session_params }, headers:
      end

      context 'with valid parameters' do
        let(:name) { 'Valid session name' }
        let(:description) { 'Valid session description' }
        let(:location) { 'Valid session location' }
        let(:meeting_link) { 'Valid session meeting link' }
        let(:start_time) { DateTime.now }
        let(:end_time) { DateTime.now + 1.hour }
        let(:group_id) { group.id }

        it 'creates Session successfully' do
          expect(response).to have_http_status(:created)
          expect(Session.count).to eq(1)
        end

        it 'returns JSON containing session data' do
          json_response = response.parsed_body

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['location']).to eq(location)
          expect(json_response['meeting_link']).to eq(meeting_link)
          expect(DateTime.parse(json_response['start_time']).utc.to_s).to eq(start_time.utc.to_s)
          expect(DateTime.parse(json_response['end_time']).utc.to_s).to eq(end_time.utc.to_s)
          expect(json_response['group_id']).to eq(group_id)
        end
      end
      context 'with invalid parameters' do
        let(:name) { '' }
        let(:description) { '' }
        let(:location) { '' }
        let(:meeting_link) { '' }
        let(:start_time) { 'Invalid date' }
        let(:end_time) { 'Invalid data' }
        let(:group_id) { -1 }

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to eq('La sesión no pudo ser creada correctamente')
          expect(json_response['errors']['name'][0]).to include('El nombre de la sesión no puede ser vacío')
          expect(json_response['errors']['start_time'][0]).to include(
            'El inicio de la sesión debe ser una fecha válida'
          )
          expect(json_response['errors']['end_time'][0]).to include('El fin de la sesión debe ser una fecha válida')
        end
      end
    end

    context 'when the user is not authenticated' do
      let(:headers) { {} }
      let(:session_params) do
        {
          name: 'Valid session name',
          description: 'Valid session description'
        }
      end

      before do
        post sessions_path, params: { session: session_params }, headers:
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
  describe 'PATCH /sessions/:id' do
    let(:session) { create :session }
    let(:session_params) do
      {
        name:,
        description:,
        location:,
        meeting_link:,
        start_time:,
        end_time:,
        group_id:
      }
    end

    context 'when the user is authenticated' do
      before do
        patch session_path(session.id), params: { session: session_params }, headers:
      end

      context 'with valid parameters' do
        let(:group) { create :group }
        let(:name) { 'Valid session name' }
        let(:description) { 'Valid session description' }
        let(:location) { 'Valid session location' }
        let(:meeting_link) { 'Valid session meeting link' }
        let(:start_time) { DateTime.now }
        let(:end_time) { DateTime.now + 1.hour }
        let(:group_id) { group.id }

        it 'updates Session successfully' do
          expect(response).to have_http_status(:ok)

          session.reload

          expect(session.name).to eq(name)
          expect(session.description).to eq(description)
          expect(session.location).to eq(location)
          expect(session.meeting_link).to eq(meeting_link)
          expect(session.start_time.utc.to_s).to eq(start_time.utc.to_s)
          expect(session.end_time.utc.to_s).to eq(end_time.utc.to_s)
          expect(session.group_id).to eq(group_id)
        end

        it 'returns JSON containing new session data' do
          json_response = response.parsed_body

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['location']).to eq(location)
          expect(json_response['meeting_link']).to eq(meeting_link)
          expect(DateTime.parse(json_response['start_time']).utc.to_s).to eq(start_time.utc.to_s)
          expect(DateTime.parse(json_response['end_time']).utc.to_s).to eq(end_time.utc.to_s)
          expect(json_response['group_id']).to eq(group_id)
        end
      end

      context 'with invalid parameters' do
        let(:name) { '' }
        let(:description) { '' }
        let(:location) { '' }
        let(:meeting_link) { '' }
        let(:start_time) { 'Invalid date' }
        let(:end_time) { 'Invalid data' }
        let(:group_id) { -1 }

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end
        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to eq('La sesión no pudo ser actualizada correctamente')
          expect(json_response['errors']['name'][0]).to include('El nombre de la sesión no puede ser vacío')
          expect(json_response['errors']['start_time'][0]).to include(
            'El inicio de la sesión debe ser una fecha válida'
          )
          expect(json_response['errors']['end_time'][0]).to include('El fin de la sesión debe ser una fecha válida')
        end
      end
    end

    context 'when the user is not authenticated' do
      before do
        patch session_path(session.id), params: { session: session_params }, headers:
      end
      let(:headers) { {} }
      let(:session_params) do
        {
          name: 'Valid session name',
          description: 'Valid session description'
        }
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

  # Destroy
  describe 'DELETE /sessions/:id' do
    let(:session) { create :session }

    context 'when the user is authenticated' do
      context 'when session cannot be destroyed due to validation errors' do
        before do
          allow_any_instance_of(Session).to receive(:destroy).and_return(false)
          delete session_path(session.id), headers:
        end

        it 'returns an unprocessable entity status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body
          expect(json_response['message']).to eq('La sesión no pudo ser borrada correctamente')
        end
      end

      context 'when the user is not the creator or group admin' do
        let(:other_user) { create :user }
        let(:other_headers) do
          post user_session_path, params: { user: { email: other_user.email, password: other_user.password } }
          { 'Authorization' => response.headers['Authorization'] }
        end

        before do
          delete session_path(session.id), headers: other_headers
        end

        it 'returns unauthorized status' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'returns JSON containing unauthorized message' do
          json_response = response.parsed_body
          expect(json_response['message']).to eq('No estás autorizado para realizar esta acción')
        end
      end
    end

    context 'when the user is not authenticated' do
      before do
        delete session_path(session.id)
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
