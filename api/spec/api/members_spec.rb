require 'swagger_helper'

RSpec.describe 'members', type: :request do
  # Authorization
  let(:user) { create :user }
  let(:headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }

    response.headers
  end

  # Update
  path '/members/{id}' do
    patch 'Updates a member' do
      tags 'Members'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Member ID'
      parameter name: :member, in: :body, schema: {
        type: :object,
        properties: {
          role: { type: :string }
        },
        required: ['member']
      }
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '200', 'Success' do
        let(:member_to_update) { create :member, :participant, group: }
        let(:id) { member_to_update.id }
        let(:group) { create :group }
        let(:member) { { role: 'admin' } }
        let('Authorization') do
          headers['Authorization']
        end

        before do
          create(:member, user:, group:)
        end

        generate_swagger_response('update_members')
        run_test! do |response|
          json_response = JSON.parse(response.body)

          expect(json_response['message']).to include('El miembro ahora es administrador del grupo')
        end
      end
    end
  end

  # Destroy
  path '/members/{id}' do
    delete 'Deletes a member' do
      tags 'Members'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true, description: 'Member ID'
      parameter name: 'Authorization', in: :header, type: :string, value: 'Bearer <JWT Token>'

      response '204', 'Success' do
        let(:member_to_delete) { create :member, group: }
        let(:id) { member_to_delete.id }
        let(:group) { create :group }
        let('Authorization') do
          headers['Authorization']
        end

        before do
          create(:member, user:, group:)
        end

        run_test!
      end
    end
  end
end
