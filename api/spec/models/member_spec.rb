require 'rails_helper'

RSpec.describe Member, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:group) }
  it { should validate_inclusion_of(:role).in_array(%w[admin participant]) }

  describe 'validations' do
    it 'should not allow roles other than admin or participant' do
      invalid_member = build(:member, role: 'fake_role')

      expect(invalid_member).not_to be_valid
      expect(invalid_member.errors[:role]).to include('is not included in the list')
    end
  end
end
