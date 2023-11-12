require 'swagger_helper'

RSpec.describe 'groups', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Index
  path '/groups' do
    get 'Returns all groups that match the filters' do
      tags 'Groups'
      produces 'application/json'
      parameter name: :name, in: :query, type: :string, value: 'Name'
      parameter name: :subject_id, in: :query, type: :string, value: '1'
      parameter name: :my_groups, in: :query, type: :string, value: 'true'
      parameter name: :time_preferences, in: :query, type: :string, value: 'night,afternoon'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let!(:group_one) do
          create :group,
                 name: 'Foo',
                 subject: subject_two,
                 time_preferences: { 'Monday' => 'Night', 'Tuesday' => 'Afternoon', 'Wednesday' => 'Night' }
        end
        let!(:group_two) do
          create :group,
                 name: 'Bar',
                 subject: subject_one,
                 time_preferences: { 'Monday' => 'Morning' }
        end
        let!(:group_three) do
          create :group,
                 name: 'Baz',
                 subject: subject_one,
                 time_preferences: { 'Monday' => 'Night' }
        end

        let(:subject_one) { create :subject }
        let(:subject_two) { create :subject }

        let(:name) { 'Ba' }
        let(:subject_id) { subject_one.id.to_s }
        let(:my_groups) { 'true' }
        let(:time_preferences) { 'night,afternoon' }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group: group_three
        end

        generate_swagger_response('index_groups')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response[0]['id']).to eq(group_three.id)
          expect(json_response[0]['name']).to eq(group_three.name)
          expect(json_response[0]['description']).to eq(group_three.description)
          expect(json_response[0]['size']).to eq(group_three.size)
          expect(json_response[0]['time_preferences']).to eq(group_three.time_preferences)
          expect(json_response[0]['subject_id']).to eq(group_three.subject_id)
          expect(json_response[0]['subject_name']).to eq(group_three.subject.name)
        end
      end
    end
  end

  # Create
  path '/groups' do
    post 'Creates a group' do
      tags 'Groups'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :group, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string },
          size: { type: :integer },
          subject_id: { type: :integer },
          time_preferences: { type: :object }
        },
        required: ['group']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '201', 'Success' do
        let(:subject) { create :subject }
        let(:name) { 'Name' }
        let(:description) { 'Description' }
        let(:size) { 5 }
        let(:subject_id) { subject.id }
        let(:time_preferences) do
          {
            'Monday' => 'Morning',
            'Tuesday' => 'Afternoon',
            'Wednesday' => 'Night',
            'Thursday' => 'None',
            'Friday' => 'Morning',
            'Saturday' => 'Afternoon',
            'Sunday' => 'Night'
          }
        end
        let(:group) do
          {
            name:,
            description:,
            size:,
            subject_id:,
            time_preferences:
          }
        end

        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('create_groups')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to be_a(Integer)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['size']).to eq(size)
          expect(json_response['subject_id']).to eq(subject_id)
          expect(json_response['time_preferences']).to eq(time_preferences)
        end
      end
    end
  end

  # Show
  path '/groups/{id}' do
    get 'Returns a group' do
      tags 'Groups'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }
        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('show_groups')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(group.id)
          expect(json_response['name']).to eq(group.name)
          expect(json_response['description']).to eq(group.description)
          expect(json_response['size']).to eq(group.size)
          expect(json_response['time_preferences']).to eq(group.time_preferences)
          expect(json_response['subject_id']).to eq(group.subject_id)
          expect(json_response['subject_name']).to eq(group.subject.name)
          expect(json_response['user_ids']).to eq(group.users.pluck(:id))
          expect(json_response['admin_ids']).to eq(group.admins.pluck(:id))
          expect(json_response['requests']).to be_an(Array)
          expect(json_response['sessions']).to be_an(Array)
        end
      end
    end
  end

  # Update
  path '/groups/{id}' do
    patch 'Updates a group' do
      tags 'Groups'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: :group, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string },
          size: { type: :integer },
          subject_id: { type: :integer },
          time_preferences: { type: :object }
        },
        required: ['group']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group_to_update) { create :group }
        let(:id) { group_to_update.id }

        let(:subject) { create :subject }
        let(:name) { 'New Name' }
        let(:description) { 'New Description' }
        let(:size) { 5 }
        let(:subject_id) { subject.id }
        let(:time_preferences) do
          {
            'Monday' => 'Morning',
            'Tuesday' => 'Afternoon',
            'Wednesday' => 'Night',
            'Thursday' => 'None',
            'Friday' => 'Morning',
            'Saturday' => 'Afternoon',
            'Sunday' => 'Night'
          }
        end
        let(:group) do
          {
            name:,
            description:,
            size:,
            subject_id:,
            time_preferences:
          }
        end

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group: group_to_update
        end

        generate_swagger_response('update_groups')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['id']).to eq(group_to_update.id)
          expect(json_response['name']).to eq(name)
          expect(json_response['description']).to eq(description)
          expect(json_response['size']).to eq(size)
          expect(json_response['time_preferences']).to eq(time_preferences)
          expect(json_response['subject_id']).to eq(subject_id)
          expect(json_response['subject_name']).to eq(subject.name)
          expect(json_response['user_ids']).to eq(group_to_update.users.pluck(:id))
          expect(json_response['admin_ids']).to eq(group_to_update.admins.pluck(:user_id))
          expect(json_response['requests']).to be_an(Array)
          expect(json_response['sessions']).to be_an(Array)
        end
      end
    end
  end

  # Destroy
  path '/groups/{id}' do
    delete 'Deletes a group' do
      tags 'Groups'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '204', 'Success' do
        let(:group) { create :group }
        let(:id) { group.id }

        let('Authorization') do
          headers['Authorization']
        end

        before do
          create :member, user:, group:
        end

        run_test!
      end
    end
  end

  # Members
  path '/groups/{id}/members' do
    get 'Returns all members of a group' do
      tags 'Groups'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Group ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:group) { create :group, :with_members }
        let(:id) { group.id }

        let('Authorization') do
          headers['Authorization']
        end

        generate_swagger_response('members_groups')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response.size).to eq(2)
          expect(json_response[0]['member_id']).to be_a(Integer)
          expect(json_response[0]['id']).to be_a(Integer)
          expect(json_response[0]['email']).to be_a(String)
          expect(json_response[0]['name']).to be_a(String)
          expect(json_response[0]['role']).to be_a(String)
        end
      end
    end
  end
end
