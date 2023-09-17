class Member < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :group

  # Validations
  validates :role, presence: true, inclusion: { in: %w[admin participant] }
end
