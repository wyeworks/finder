require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:course) }

    it { should validate_numericality_of(:size).only_integer }

    it do
      is_expected.to validate_inclusion_of(:time_preference).in_array(%w[
                                                                        Morning
                                                                        Afternoon
                                                                        Night
                                                                      ])
    end

    it do
      is_expected.to validate_inclusion_of(:days).in_array(%w[
                                                             Monday
                                                             Tuesday
                                                             Wednesday
                                                             Thursday
                                                             Friday
                                                             Saturday
                                                             Sunday
                                                           ])
    end

    describe 'validations' do
      let!(:group) { create(:group, name: 'Group1') }

      it 'validates uniqueness of name' do
        new_group = build(:group, name: 'Group1')
        expect(new_group.valid?).to be false
        expect(new_group.errors[:name]).to include('has already been taken')
      end
    end
  end
end
