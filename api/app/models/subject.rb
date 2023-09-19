class Subject < ApplicationRecord
  # Associations
  has_many :groups, dependent: :nullify

  # Validations
  validates :name, :credits, :code, presence: true
  validates :code, uniqueness: { case_sensitive: false }
  validates :credits, numericality: { only_integer: true }
end
