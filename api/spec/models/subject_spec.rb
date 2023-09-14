require 'rails_helper'

RSpec.describe Subject, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:credits) }
    it { should validate_presence_of(:code) }
    it { should validate_uniqueness_of(:code) }
  end
end
