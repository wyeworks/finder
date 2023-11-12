require 'swagger_helper'

RSpec.describe 'sessions', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Create
  path '/sessions' do
    post 'Creates a session' do
      tags 'Sessions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :session, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string },
          location: { type: :string },
          meeting_link: { type: :string },
          start_time: { type: :string },
          end_time: { type: :string },
          group_id: { type: :integer }
        },
        required: ['session']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '201', 'Success' do
        let(:group) { create :group }
        let(:name) { 'Name' }
        let(:description) { 'Description' }
        let(:location) { 'Location' }
        let(:meeting_link) { 'Meeting Link' }
        let(:start_time) { '2023-11-07 00:00' }
        let(:end_time) { '2023-11-07 02:00' }
        let(:group_id) { group.id }
        let(:session) do
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

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('create_sessions')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['location']).to eq(location)
          expect(json_response['meeting_link']).to eq(meeting_link)
          expect(DateTime.parse(json_response['start_time'])).to eq(DateTime.parse(start_time))
          expect(DateTime.parse(json_response['end_time'])).to eq(DateTime.parse(end_time))
          expect(json_response['group_id']).to eq(group_id)
          expect(json_response['creator_user_id']).to eq(user.id)
        end
      end
    end
  end

  # Show
  path '/sessions/{id}' do
    get 'Returns a session' do
      tags 'Sessions'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Session ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:session) { create :session, group: }
        let(:id) { session.id }
        let(:group) { create :group }
        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        generate_swagger_response('show_sessions')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expected_attendances = session.attendances.map do |attendance|
            {
              'id' => attendance.id,
              'session_id' => attendance.session_id,
              'status' => attendance.status,
              'created_at' => attendance.created_at.utc.iso8601(3),
              'updated_at' => attendance.updated_at.utc.iso8601(3),
              'member_id' => attendance.member_id,
              'member_name' => user.name,
              'user_id' => user.id
            }
          end

          expect(json_response['id']).to eq(session.id)
          expect(json_response['name']).to eq(session.name)
          expect(json_response['description']).to eq(session.description)
          expect(json_response['location']).to eq(session.location)
          expect(json_response['meeting_link']).to eq(session.meeting_link)
          expect(DateTime.parse(json_response['start_time']).utc.to_s).to eq(session.start_time.to_s)
          expect(DateTime.parse(json_response['end_time']).utc.to_s).to eq(session.end_time.to_s)
          expect(json_response['group_id']).to eq(session.group_id)
          expect(json_response['creator_user_id']).to eq(user.id)
          expect(json_response['attendances']).to match_array(expected_attendances)
        end
      end
    end
  end

  # Update
  path '/sessions/{id}' do
    patch 'Updates a session' do
      tags 'Sessions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Session ID'
      parameter name: :session, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string },
          location: { type: :string },
          meeting_link: { type: :string },
          start_time: { type: :string },
          end_time: { type: :string },
          group_id: { type: :integer }
        },
        required: ['session']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group }
        let(:member) { create :member, user:, group: }
        let(:session_to_update) { create :session, group:, creator: member }
        let(:id) { session_to_update.id }

        let(:name) { 'New Name' }
        let(:description) { 'New Description' }
        let(:location) { 'New Location' }
        let(:meeting_link) { 'New Meeting Link' }
        let(:start_time) { '2023-11-07 00:00' }
        let(:end_time) { '2023-11-07 02:00' }
        let(:group_id) { group.id }

        let(:session) do
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
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('update_sessions')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(session_to_update.id)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['location']).to eq(location)
          expect(json_response['meeting_link']).to eq(meeting_link)
          expect(DateTime.parse(json_response['start_time'])).to eq(DateTime.parse(start_time))
          expect(DateTime.parse(json_response['end_time'])).to eq(DateTime.parse(end_time))
          expect(json_response['group_id']).to eq(group_id)
          expect(json_response['creator_user_id']).to eq(user.id)
        end
      end
    end
  end

  # Destroy
  path '/sessions/{id}' do
    delete 'Deletes a session' do
      tags 'Sessions'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Session ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '204', 'Success' do
        let(:group) { create :group }
        let(:member) { create :member, user:, group: }
        let(:session) { create :session, group:, creator: member }
        let(:id) { session.id }
        let('Authorization') do
          headers['Authorization']
        end

        run_test!
      end
    end
  end
end
