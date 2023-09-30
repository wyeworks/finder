require 'rails_helper'

RSpec.describe Request, type: :model do
  describe 'enums' do
    it { should define_enum_for(:status).with_values(pending: 0, accepted: 1, rejected: 2) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:group) }
  end

  describe 'validations' do
    it { should validate_presence_of(:status) }

    let(:request) { build(:request) }

    context 'with valid attributes' do
      it 'is valid' do
        expect(request).to be_valid
      end
    end

    context 'without a status' do
      it 'is not valid' do
        request.status = nil
        expect(request).to_not be_valid
      end
    end

    context 'when assigned an invalid status' do
      it 'raises an ArgumentError' do
        expect { request.status = 'invalid_status' }.to raise_error(ArgumentError)
      end
    end

    context 'when status is rejected and there is no reason' do
      let(:request) { build(:request, :with_rejected_status, reason: nil) }

      it 'is not valid' do
        expect(request).not_to be_valid
      end
    end

    context 'when there is an existing pending or accepted request for the same user and group' do
      let(:user) { create(:user) }
      let(:group) { create(:group) }
      let!(:existing_request) { create(:request, user:, group:) }
      let(:new_request) { build(:request, user:, group:) }

      it 'does not allow the creation of a new request' do
        expected_error = 'Ya hay una solicitud pendiente o aceptada para este usuario y grupo'
        expect(new_request).not_to be_valid
        expect(new_request.errors[:general]).to include(expected_error)
      end
    end
  end
end
