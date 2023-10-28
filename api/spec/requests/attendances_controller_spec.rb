require 'rails_helper'

RSpec.describe AttendancesController, type: :request do
  # General
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  # Update
  describe 'PATCH /attendances/:id' do
    let(:attendance) { create :attendance }
    let(:group) { attendance.session.group }
    let(:attendance_params) { { status: } }

    context "when user is a group's member" do
      before do
        create(:member, role: 'participant', user:, group:)

        patch attendance_path(attendance.id), params: { attendance: attendance_params }, headers:
      end

      context 'with valid parameters' do
        let(:status) { 'accepted' }

        it 'updates Attendance successfully' do
          expect(response).to have_http_status(:ok)

          expect(attendance.reload.status).to eq(status)
        end

        it 'returns JSON containing attendance new data' do
          json_response = response.parsed_body

          expect(json_response['id']).to eq(attendance.id)
          expect(json_response['status']).to eq(status)
          expect(json_response['session_id']).to eq(attendance.session_id)
          expect(json_response['member_id']).to eq(attendance.member_id)
        end
      end

      context 'with invalid parameters' do
        let(:status) { '' }

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message'])
            .to include('La asistencia no pudo ser actualizada correctamente')
          expect(json_response['errors']['status'][0])
            .to include('El estado de la asistencia no puede ser vacío')
        end
      end
    end

    context "when user is not a group's member" do
      before do
        patch attendance_path(attendance.id), params: { attendance: attendance_params }, headers:
      end

      it 'returns http unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns JSON containing error message' do
        json_response = response.parsed_body

        expect(json_response['message']).to include('No estás autorizado para realizar esta acción')
      end
    end

    context 'when the attendance does not exist' do
      let(:attendance_id) { -1 }

      before do
        patch attendance_path(attendance_id), params: { attendance: attendance_params }, headers:
      end

      it 'returns a not found response' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns JSON containing an error message' do
        json_response = response.parsed_body

        expect(json_response['errors']['attendance'])
          .to include("No se pudo encontrar la asistencia con ID ##{attendance_id}")
      end
    end
  end
end
