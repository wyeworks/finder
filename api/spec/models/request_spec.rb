require 'rails_helper'

RSpec.describe Request, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:group) }
  end

  describe 'validations' do
    let(:request) { build(:request) }

    it 'is valid with valid attributes' do
      expect(request).to be_valid
    end

    it 'is not valid without a status' do
      request.status = nil
      expect(request).to_not be_valid
    end

    it 'raises an ArgumentError when assigned an invalid status' do
      expect { request.status = 'invalid_status' }.to raise_error(ArgumentError)
    end

    it 'is not valid without a reason when status is rejected' do
      request.status = 'rejected'
      request.reason = nil
      expect(request).to_not be_valid
    end
  end
end
