class Request < ApplicationRecord
  # Enums
  enum status: { pending: 0, accepted: 1, rejected: 2 }

  # Associations
  belongs_to :user
  belongs_to :group

  # Validations
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validates :reason, presence: true, if: -> { status == 'rejected' }
  validate :no_duplicate_pending_or_accepted_requests, on: :create

  private

  def no_duplicate_pending_or_accepted_requests
    existing_request = Request.where(user_id:, group_id:)
                              .exists?(status: %w[pending accepted])

    errors.add(:general, 'Ya hay una solicitud pendiente o aceptada para este usuario y grupo') if existing_request
  end
end
