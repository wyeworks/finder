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
end
