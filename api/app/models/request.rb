class Request < ApplicationRecord
  # Enums
  enum status: { pending: 0, accepted: 1, rejected: 2 }

  # Associations
  belongs_to :user
  belongs_to :group

  # Validations
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validates :reason, presence: true, if: -> { status == 'rejected' }
end
