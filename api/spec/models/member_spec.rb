require 'rails_helper'

RSpec.describe Member, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:group) }
  end

  describe 'validations' do
    it { should validate_inclusion_of(:role).in_array(%w[admin participant]) }

    it 'should not allow roles other than admin or participant' do
      invalid_member = build(:member, role: 'fake_role')

      expect(invalid_member).not_to be_valid
      expect(invalid_member.errors[:role]).to include('El rol utilizado no es una opción válida')
    end
  end

  describe '#promote!' do
    let(:member) { create :member, role: 'participant' }

    it 'changes member role to admin' do
      member.promote!

      expect(member.reload.role).to eq('admin')
    end
  end

  describe '#assign_new_session_creator' do
    let!(:group) { create(:group) }
    let!(:admin_member) { create(:member, group:) }
    let!(:creator_member) { create(:member, role: 'participant', group:) }
    let!(:sessions_created) { create_list(:session, 3, creator: creator_member) }

    context 'when a member that created sessions is destroyed' do
      before do
        creator_member.destroy
      end

      it 'reassigns the sessions to another admin in the group' do
        sessions_created.each do |session|
          expect(session.reload.creator_id).to eq(admin_member.id)
        end
      end
    end
  end
end
