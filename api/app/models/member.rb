class Member < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :group
  has_many :attendances, dependent: :destroy
  has_many :attended_sessions, through: :attendances, source: :session

  # Validations
  validates :role, presence: true, inclusion: { in: %w[admin participant] }

  def promote!
    update!(role: 'admin')
  end
end
