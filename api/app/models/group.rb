class Group < ApplicationRecord
  # Validations
  validates :name, :course, presence: true
  validates :size, numericality: { only_integer: true }
  validates :time_preference, inclusion: { in: %w[morning afternoon night] }
end
