require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:birth_date) }

    describe 'email' do
      let(:subject) { build :user, email: }

      context 'invalid format' do
        let(:email) { 'test@mail.com' }

        it { is_expected.not_to be_valid }
      end

      context 'valid format' do
        let(:email) { 'test@fing.edu.uy' }

        it { is_expected.to be_valid }
      end
    end
  end
end
