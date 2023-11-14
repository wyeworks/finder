require 'swagger_helper'

RSpec.describe 'attendances', type: :request do
  # Authorization
  let(:user) { attendance_to_update.member.user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Update
  path '/attendances/{id}' do
    patch 'Updates an attendance' do
      tags 'Attendances'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Attendance ID'
      parameter name: :attendance, in: :body, schema: {
        type: :object,
        properties: {
          status: { type: :string }
        },
        required: ['attendance']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:attendance_to_update) { create :attendance }
        let(:id) { attendance_to_update.id }
        let(:group) { attendance_to_update.session.group }
        let(:attendance) { { status: 'accepted' } }
        let('Authorization') do
          headers['Authorization']
        end

        before do
          create(:member, role: 'participant', user:, group:)
        end

        generate_swagger_response('update_attendances')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(attendance_to_update.id)
          expect(json_response['status']).to eq(attendance[:status])
          expect(json_response['session_id']).to eq(attendance_to_update.session_id)
          expect(json_response['member_id']).to eq(attendance_to_update.member_id)
        end
      end
    end
  end
end
