class Member < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :group
  has_many :attendances, dependent: :destroy
  has_many :attended_sessions, through: :attendances, source: :session

  # Validations
  validates :role, presence: true, inclusion: { in: %w[admin participant] }
  validates :user_id, uniqueness: { scope: :group_id }

  # After
  after_create :add_to_upcoming_sessions

  # Before
  before_destroy :destroy_associated_sessions

  def promote!
    update!(role: 'admin')
  end

  private

  def destroy_associated_sessions
    sessions_created_by_member = Session.where(creator_id: id)
    sessions_created_by_member.destroy_all
  end

  def add_to_upcoming_sessions
    group.sessions.each do |session|
      Attendance.create!(member: self, session:) if session.end_time > DateTime.now
    end
  end
end
