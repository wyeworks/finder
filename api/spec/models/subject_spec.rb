require 'rails_helper'

RSpec.describe Subject, type: :model do
  describe 'associations' do
    it { should have_many(:groups).dependent(:nullify) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:credits) }
    it { should validate_presence_of(:code) }
    it { should validate_uniqueness_of(:code).case_insensitive }
  end
end
