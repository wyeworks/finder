class Career < ApplicationRecord
  # Validations
  validates :name, :code, presence: true
  validates :code, uniqueness: { case_sensitive: false }
  validates :years, :credits, numericality: { only_integer: true }
end
