class Member < ApplicationRecord
  belongs_to :user
  belongs_to :group

  # Validations
  validates :role, inclusion: { in: %w[admin student] }
end
