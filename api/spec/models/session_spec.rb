require 'rails_helper'

RSpec.describe Session, type: :model do
  describe 'associations' do
    it { should belong_to(:group) }
    it { should have_many(:attendances).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:location) }

    let(:session) { build(:session) }

    context 'with valid attributes' do
      it 'is valid' do
        expect(session).to be_valid
      end
    end

    context 'when end_time is before start_time' do
      it 'is not valid' do
        session.start_time = Time.zone.now
        session.end_time = 1.hour.ago
        expect(session).not_to be_valid
        expect(session.errors[:end_time]).to include('La hora de fin debe ser posterior de la hora de inicio')
      end
    end
  end

  describe 'callbacks' do
    let(:group) { create(:group, :with_members) }
    let(:session) { build(:session, group:) }

    it 'creates attendances for all group members after session creation' do
      expect { session.save! }.to change(Attendance, :count).by(group.users.count)
    end
  end
end
