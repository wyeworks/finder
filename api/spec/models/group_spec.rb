require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:course) }

    it { should validate_numericality_of(:size).only_integer }

    describe 'time_preference' do
      let(:subject) { build :group, time_preference: }

      context 'invalid time_preference' do
        let(:time_preference) { 'midnight' }

        it { is_expected.not_to be_valid }
      end

      context 'valid time_preference as morning' do
        let(:time_preference) { 'morning' }

        it { is_expected.to be_valid }
      end

      context 'valid time_preference as afternoon' do
        let(:time_preference) { 'afternoon' }

        it { is_expected.to be_valid }
      end

      context 'valid time_preference as night' do
        let(:time_preference) { 'night' }

        it { is_expected.to be_valid }
      end
    end
  end
end
