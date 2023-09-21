class Career < ApplicationRecord
  # Associations
  has_and_belongs_to_many :subjects
  has_and_belongs_to_many :users

  # Validations
  validates :name, :code, presence: true
  validates :code, uniqueness: { case_sensitive: false }
  validates :years, :credits, numericality: { only_integer: true }
end
