require 'rails_helper'

RSpec.describe Subject, type: :model do
  describe 'associations' do
    it { should have_many(:groups).dependent(:nullify) }
    it { should have_and_belong_to_many(:users) }
  end

  describe 'validations' do
    subject { create(:subject) }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:credits) }
    it { should validate_presence_of(:code) }
    it { should validate_uniqueness_of(:code).case_insensitive }
    it { should validate_numericality_of(:credits).only_integer }
  end
end
