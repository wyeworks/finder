require 'rails_helper'

RSpec.describe MembersController, type: :request do
  # General
  let(:group) { create :group }
  let(:admin) { create :user }
  let(:another_admin) { create :user }
  let(:member) { create :user }
  let(:another_member) { create :user }

  let(:headersAdmin) do
    post user_session_path, params: { user: { email: admin.email, password: admin.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  let(:headersMember) do
    post user_session_path, params: { user: { email: member.email, password: member.password } }
    { 'Authorization' => response.headers['Authorization'] }
  end

  before do
    @admin_member = group.members.create(user: admin, role: 'admin')
    @another_admin_member = group.members.create(user: another_admin, role: 'admin')
    @member = group.members.create(user: member, role: 'participant')
    @another_member = group.members.create(user: another_member, role: 'participant')
  end

  # Update Member
  describe 'PATCH /members/:member_id' do
    context 'when user is the group admin' do
      context 'and wants to promote a participant' do
        it 'promotes the participant to admin' do
          patch "/members/#{@member.id}", params: { role: 'admin' }, headers: headersAdmin

          expect(response).to have_http_status(:success)
          expect(@member.reload.role).to eq('admin')
        end
      end

      context 'and wants to demote an admin' do
        it 'demotes the admin to participant if there are other admins' do
          patch "/members/#{@another_admin_member.id}", params: { role: 'participant' }, headers: headersAdmin

          expect(response).to have_http_status(:success)
          expect(@another_admin_member.reload.role).to eq('participant')
        end

        it 'returns an error if there is only one admin in the group' do
          # Asegúrate de que solo quede un administrador en el grupo
          @another_admin_member.destroy

          patch "/members/#{@admin_member.id}", params: { role: 'participant' }, headers: headersAdmin

          expect(response).to have_http_status(:unauthorized)
          expect(@admin_member.reload.role).to eq('admin')
        end
      end

      context 'and wants to update with an invalid role' do
        it 'returns unprocessable entity status' do
          patch "/members/#{@member.id}", params: { role: 'invalid_role' }, headers: headersAdmin

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'when user is a group participant' do
      context 'and tries to update their own role' do
        it 'returns unauthorized status' do
          patch "/members/#{@member.id}", params: { role: 'admin' }, headers: headersMember

          expect(response).to have_http_status(:unauthorized)
          expect(@member.reload.role).to eq('participant')
        end
      end

      context 'and tries to update another member' do
        it 'returns unauthorized status' do
          patch "/members/#{@another_member.id}", params: { role: 'admin' }, headers: headersMember

          expect(response).to have_http_status(:unauthorized)
          expect(@another_member.reload.role).to eq('participant')
        end
      end
    end
  end

  # Destroy Member
  describe 'DELETE /members/:id' do
    context "when user is the group's admin" do
      context 'and there are other members' do
        before do
          delete "/members/#{@admin_member.id}", headers: headersAdmin
        end

        it 'deletes the member successfully' do
          expect(response).to have_http_status(:no_content)
          expect(Member.find_by(id: member.id)).to be_nil
        end
      end

      context 'and group only has one member' do
        before do
          Member.find(@member.id).destroy
          Member.find(@another_member.id).destroy
          Member.find(@another_admin_member.id).destroy

          delete "/members/#{@admin_member.id}", headers: headersAdmin
        end

        it 'deletes himself and the group successfully' do
          expect(response).to have_http_status(:no_content)
          expect(Member.find_by(id: member.id)).to be_nil
          expect(Member.count).to eq(0)
          expect(Group.count).to eq(0)
        end
      end

      context "and there's an invalid record when trying to promote a member" do
        before do
          Member.find(@another_admin_member.id).destroy
          expect_any_instance_of(Group).to receive(:promote_oldest_member!)
            .and_raise(ActiveRecord::RecordInvalid)

          delete "/members/#{@admin_member.id}", headers: headersAdmin
        end

        it 'returns an error status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['errors']['group'])
            .to include('No se pudo promover al participante más antiguo del grupo')
        end
      end
    end

    context "when user is a group's member" do
      context 'and tries to remove himself' do
        before do
          delete "/members/#{@member.id}", headers: headersMember
        end

        it 'deletes himself successfully' do
          expect(response).to have_http_status(:no_content)
          expect(Member.find_by(id: member.id)).to be_nil
        end
      end

      context 'and tries to remove another member' do
        before do
          delete "/members/#{@another_member.id}", headers: headersMember
        end

        it 'returns unauthorized status' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'does not delete the other member' do
          expect(Member.find_by(id: @another_member.id)).not_to be_nil
        end
      end

      context 'when member destruction fails' do
        let(:headers) do
          post user_session_path, params: { user: { email: admin.email, password: admin.password } }
          { 'Authorization' => response.headers['Authorization'] }
        end

        before do
          allow_any_instance_of(Member).to receive(:destroy).and_return(false)
          delete "/members/#{@admin_member.id}", headers:
        end

        it 'returns an unprocessable entity status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns a JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to eq('El miembro no pudo ser eliminado correctamente')
        end
      end

      context 'when member does not exist' do
        let(:non_existent_member_id) { -1 }

        before do
          delete "/members/#{non_existent_member_id}", headers: headersAdmin
        end

        it 'returns a not found status' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns a JSON containing error messages' do
          json_response = response.parsed_body
          error_message = "No se pudo encontrar el miembro con el ID ##{non_existent_member_id}"
          expect(json_response['errors']['member']).to include(error_message)
        end
      end
    end
  end
end
