require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build :user }

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:birth_date) }
  end
end
