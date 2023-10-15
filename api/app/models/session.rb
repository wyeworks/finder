class Session < ApplicationRecord
  # Associations
  has_many :attendances, dependent: :destroy
  has_many :attendees, through: :attendances, source: :user
  belongs_to :group

  # Validations
  validates :name, :start_time, :end_time, presence: true
  validate :end_time_after_start_time

  # After
  after_create :create_attendances_for_group_members

  private

  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    return unless end_time < start_time

    errors.add(:end_time, 'La hora de fin debe ser posterior de la hora de inicio')
  end

  def create_attendances_for_group_members
    group.users.each do |user|
      Attendance.create!(user:, session: self)
    end
  end
end
