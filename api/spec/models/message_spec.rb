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

  describe '#group_by_date' do
    let(:subject) { described_class.group_by_date(group_id: group.id) }
    let(:group) { create :group }

    let!(:message_one) { create :message, group:, created_at: 1.day.ago }
    let!(:message_two) { create :message, group:, created_at: 2.days.ago }
    let!(:message_three) { create :message, group:, created_at: 1.day.ago }

    it 'returns messages grouped by date' do
      expect(subject.keys).to match_array([2.days.ago.to_date, 1.day.ago.to_date])
      expect(subject.values).to match_array(
        [[message_two], [message_one, message_three]]
      )
    end
  end

  describe '#date' do
    let(:subject) { create :message, created_at: '2023-11-04 18:45:13 UTC +00:00' }

    it 'returns the date without time' do
      expect(subject.date.to_s).to eq('2023-11-04')
    end
  end
end
