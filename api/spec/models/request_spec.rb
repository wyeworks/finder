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

    context 'when user request to join a group they are already a member of' do
      let(:user) { create(:user) }
      let(:group) { create(:group) }
      let!(:member) { create(:member, user:, group:) }
      let(:request) { build(:request, user:, group:) }

      it 'does not allow the creation of a request' do
        expect(request).not_to be_valid
        expect(request.errors[:user]).to include('Ya formas parte de este grupo')
      end
    end

    context 'when group has reached its maximum capacity' do
      let(:group) { create(:group, size: 1) }
      let!(:member) { create(:member, group:) }
      let(:request) { build(:request, group:) }

      it 'does not allow the creation of a request' do
        expect(request).not_to be_valid
        expect(request.errors[:group]).to include('El grupo ya ha alcanzado su capacidad máxima')
      end
    end

    context 'when there is an existing pending request for the same user and group' do
      let(:user) { create(:user) }
      let(:group) { create(:group) }
      let!(:existing_request) { create(:request, user:, group:) }
      let(:new_request) { build(:request, user:, group:) }

      it 'does not allow the creation of a new request' do
        expected_error = 'Ya hay una solicitud pendiente para este usuario y grupo'
        expect(new_request).not_to be_valid
        expect(new_request.errors[:general]).to include(expected_error)
      end
    end

    context 'when trying to modify a request with status accepted or rejected' do
      let(:accepted_request) { create(:request, status: 'accepted') }
      let(:rejected_request) { create(:request, :with_rejected_status, :with_reason) }
      expected_error = 'No se puede modificar una solicitud que ya ha sido aceptada o rechazada'

      it 'does not allow modification of an accepted request' do
        accepted_request.status = 'pending'
        expect(accepted_request.save).to be_falsey
        expect(accepted_request.errors[:status]).to include(expected_error)
      end

      it 'does not allow modification of a rejected request' do
        rejected_request.status = 'pending'
        expect(rejected_request.save).to be_falsey
        expect(rejected_request.errors[:status]).to include(expected_error)
      end
    end
  end
end
