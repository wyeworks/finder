require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'associations' do
    it { should have_many(:members).dependent(:destroy) }
    it { should have_many(:users).through(:members) }
    it { should belong_to(:subject) }
  end

  describe 'validations' do
    subject { create(:group) }
    it { should validate_presence_of(:name) }
    it { should validate_numericality_of(:size).only_integer }

    describe '#validate_time_preferences' do
      let(:group) { build(:group) }

      it 'is valid with valid time_preferences' do
        group.time_preferences = { 'Monday' => 'Morning', 'Tuesday' => 'None' }
        expect(group).to be_valid
      end

      it 'is invalid with invalid days' do
        group.time_preferences = { 'InvalidDay' => 'Morning' }
        expect(group).not_to be_valid
        expect(group.errors.messages[:time_preferences]).to include('should have a valid time preference for each day')
      end

      it 'is invalid with invalid time_preferences' do
        group.time_preferences = { 'Monday' => 'InvalidTime' }
        expect(group).not_to be_valid
        expect(group.errors.messages[:time_preferences]).to include('should have a valid time preference for each day')
      end
    end
  end
end
