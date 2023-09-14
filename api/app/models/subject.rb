class Subject < ApplicationRecord
  # Validations
  validates :name, :credits, :code, presence: true
  validates :code, uniqueness: true
end
