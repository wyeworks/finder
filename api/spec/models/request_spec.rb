require 'rails_helper'

RSpec.describe Request, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:group) }
  end

  describe 'validations' do
    let(:valid_request) { build(:request) }

    it 'is valid with valid attributes' do
      expect(valid_request).to be_valid
    end

    it 'is not valid without a status' do
      valid_request.status = nil
      expect(valid_request).to_not be_valid
    end

    it 'raises an ArgumentError when assigned an invalid status' do
      expect { valid_request.status = 'invalid_status' }.to raise_error(ArgumentError)
    end

    it 'is not valid without a reason when status is rejected' do
      valid_request.status = 'rejected'
      valid_request.reason = nil
      expect(valid_request).to_not be_valid
    end
  end
end
