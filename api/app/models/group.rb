class Group < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :users, through: :members

  # Validations
  validates :name, :course, presence: true
  validates :size, numericality: { only_integer: true }
  validates :time_preference, inclusion: { in: %w[morning afternoon night] }
end
