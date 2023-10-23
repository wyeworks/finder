class Member < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :group
  has_many :attendances, dependent: :destroy
  has_many :attended_sessions, through: :attendances, source: :session

  # Validations
  validates :role, presence: true, inclusion: { in: %w[admin participant] }

  # Before
  before_destroy :destroy_associated_sessions

  def promote!
    update!(role: 'admin')
  end

  private
  def destroy_associated_sessions
    sessions_created_by_member = Session.where(creator_id: self.id)
    sessions_created_by_member.destroy_all
  end
end
