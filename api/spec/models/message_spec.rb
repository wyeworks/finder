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

  describe 'factories' do
    it 'has a valid factory' do
      expect(build(:message)).to be_valid
    end

    it 'is invalid without a user' do
      message = build(:message, user: nil)
      expect(message).not_to be_valid
    end

    it 'is invalid without a group' do
      message = build(:message, group: nil)
      expect(message).not_to be_valid
    end
  end
end
