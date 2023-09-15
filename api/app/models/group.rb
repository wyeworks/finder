class Group < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :users, through: :members

  # Validations
  validates :name, :course, presence: true
  validates :size, presence: true, numericality: { only_integer: true }
  validates :days, inclusion: { in: %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday] }
  validates :time_preference, inclusion: { in: %w[Morning Afternoon Night] }
end
