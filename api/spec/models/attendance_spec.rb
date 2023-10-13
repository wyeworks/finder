require 'rails_helper'

RSpec.describe Attendance, type: :model do
  describe 'enums' do
    it { should define_enum_for(:status).with_values(pending: 0, accepted: 1, rejected: 2) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:session) }
  end

  describe 'validations' do
    it { should validate_presence_of(:status) }

    let(:attendance) { build(:attendance) }

    context 'with valid attributes' do
      it 'is valid' do
        expect(attendance).to be_valid
      end
    end

    context 'without a status' do
      it 'is not valid' do
        attendance.status = nil
        expect(attendance).to_not be_valid
      end
    end

    context 'when assigned an invalid status' do
      it 'raises an ArgumentError' do
        expect { attendance.status = 'invalid_status' }.to raise_error(ArgumentError)
      end
    end
  end
end
