class Attendance < ApplicationRecord
  # Enums
  enum status: { pending: 0, accepted: 1, rejected: 2 }

  # Associations
  belongs_to :member
  belongs_to :session

  # Validations
  validates :status, presence: true, inclusion: { in: statuses.keys }
end
