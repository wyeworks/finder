class Member < ApplicationRecord
  belongs_to :user
  belongs_to :group

  # Validations
  validates :role, presence: true
  validates :role, inclusion: { in: %w[admin participant] }
end
