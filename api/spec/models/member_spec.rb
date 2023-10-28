require 'rails_helper'

RSpec.describe Member, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:group) }
  end

  describe 'validations' do
    subject { build(:member) }

    it { should validate_presence_of(:role) }
    it { should validate_inclusion_of(:role).in_array(%w[admin participant]) }
    it { should validate_uniqueness_of(:user_id).scoped_to(:group_id) }

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

  describe '#add_to_upcoming_sessions' do
    let(:user) { create :user }

    before do
      create :group, :with_sessions
    end

    it 'adds member to upcoming sessions' do
      group = Group.first
      session_one = group.sessions.first
      session_two = group.sessions.second
      session_two.update(start_time: 2.hours.ago, end_time: 1.hour.ago)

      create :member, user:, group:, role: 'participant'

      member = Member.where(user:, group:).last
      expect(member.attended_sessions).to include(session_one)
      expect(member.attended_sessions).not_to include(session_two)
    end
  end
end
