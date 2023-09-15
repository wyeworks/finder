require 'rails_helper'

RSpec.describe Member, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:group) }
  it { should validate_inclusion_of(:role).in_array(%w[admin student]) }
end
