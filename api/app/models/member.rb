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
  before_destroy :assign_new_session_creator

  def promote!
    update!(role: 'admin')
  end

  def admin?
    role == 'admin'
  end

  def participant?
    role == 'participant'
  end

  private

  def assign_new_session_creator
    sessions_created_by_member = Session.where(creator_id: id)
    admin_member = group.admins.where.not(id:).first

    # At this point, it is certain that an administrator exists in the group
    sessions_created_by_member.each do |session|
      session.update(creator_id: admin_member.id)
    end
  end

  def add_to_upcoming_sessions
    group.sessions.each do |session|
      Attendance.create!(member: self, session:) if session.end_time > DateTime.now
    end
  end
end
