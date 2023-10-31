require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:group) }
  end

  describe 'validations' do
    subject { build(:message) }

    it { should validate_presence_of(:content) }
    it { should validate_presence_of(:hour) }
  end
end
