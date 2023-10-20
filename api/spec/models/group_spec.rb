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
        expect(group.errors.messages[:time_preferences]).to include('Debe tener una preferencia válida para cada día')
      end

      it 'is invalid with invalid time_preferences' do
        group.time_preferences = { 'Monday' => 'InvalidTime' }
        expect(group).not_to be_valid
        expect(group.errors.messages[:time_preferences]).to include('Debe tener una preferencia válida para cada día')
      end
    end
  end

  describe 'scopes' do
    describe 'search_by_params' do
      let(:subject) { described_class.search_by_params(name:, subject_id:) }

      let(:subject_one) { create :subject }
      let(:subject_two) { create :subject }

      let(:group_one) { create :group, name: 'Foo', subject_id: subject_one.id }
      let(:group_two) { create :group, name: 'Bar', subject_id: subject_one.id }
      let(:group_three) { create :group, name: 'Baz', subject_id: subject_two.id }

      context 'when name is passed as a parameter' do
        let(:name) { 'Ba' }
        let(:subject_id) { nil }

        it 'returns groups that matches that name' do
          expect(subject).to match_array([group_two, group_three])
        end
      end

      context 'when subject_id is passed as a parameter' do
        let(:name) { nil }
        let(:subject_id) { subject_one.id }

        it 'returns groups with that exact subject_id' do
          expect(subject).to match_array([group_one, group_two])
        end
      end

      context 'when both name and subject_id are passed as parameters' do
        let(:name) { 'Ba' }
        let(:subject_id) { subject_one.id }

        it 'returns groups that match that criteria' do
          expect(subject).to match_array([group_two])
        end
      end

      context 'when no parameters are passed' do
        let(:name) { nil }
        let(:subject_id) { nil }

        it 'returns all groups' do
          expect(subject).to match_array([group_one, group_two, group_three])
        end
      end
    end
  end

  describe '#admin?' do
    let(:group) { create :group }
    let(:user) { create :user }

    context 'when user is admin' do
      before do
        create(:member, role: 'admin', group:, user:)
      end

      it 'returns true' do
        expect(group.admin?(user)).to be(true)
      end
    end

    context 'when user is not admin' do
      before do
        create(:member, role: 'participant', group:, user:)
      end

      it 'returns false' do
        expect(group.admin?(user)).to be(false)
      end
    end
  end

  describe '#admins' do
    let(:group) { create :group }
    let!(:member1) { create :member, role: 'admin', group: }
    let!(:member2) { create :member, role: 'admin', group: }
    let!(:member3) { create :member, role: 'participant', group: }

    it 'returns only the admin users' do
      expect(group.admins).to include(member1, member2)
      expect(group.admins).not_to include(member3)
    end
  end

  describe '#participants' do
    let(:group) { create :group }
    let!(:member1) { create :member, role: 'participant', group: }
    let!(:member2) { create :member, role: 'participant', group: }
    let!(:member3) { create :member, role: 'admin', group: }

    it 'returns the non-admin users' do
      expect(group.participants).to include(member1, member2)
      expect(group.participants).not_to include(member3)
    end
  end

  describe '#promote_oldest_member!' do
    let(:group) { create :group }
    let!(:member1) do
      create :member,
             role: 'participant',
             group:,
             created_at: 2.days.ago
    end
    let!(:member2) do
      create :member,
             role: 'participant',
             group:,
             created_at: 1.day.ago
    end

    context 'when oldest member gets successfully promoted' do
      it 'changes their role to admin' do
        group.promote_oldest_member!

        expect(member1.reload.role).to eq('admin')
        expect(member2.reload.role).to eq('participant')
      end
    end

    context 'when an exception is raised' do
      it 'does not change their role to admin' do
        expect_any_instance_of(Member).to receive(:promote!)
          .and_raise(ActiveRecord::RecordInvalid)

        expect { group.promote_oldest_member! }.to raise_error(ActiveRecord::RecordInvalid)

        expect(member1.reload.role).to eq('participant')
        expect(member2.reload.role).to eq('participant')
      end
    end
  end
end
