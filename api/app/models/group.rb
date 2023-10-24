class Group < ApplicationRecord
  # Constants
  DAY_PREFERENCES = %w[
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
    Sunday
  ].freeze

  TIME_PREFERENCES = %w[
    Morning
    Afternoon
    Night
    None
  ].freeze

  # Associations
  has_many :members, dependent: :destroy
  has_many :users, through: :members
  has_many :requests, dependent: :destroy
  has_many :sessions, dependent: :destroy
  belongs_to :subject

  # Validations
  validates :name, :size, presence: true
  validates :size, numericality: { only_integer: true }
  validate :validate_time_preferences

  # Scopes
  scope :search_by_params, ->(name:, subject_id:) do
    groups = where('name ILIKE ?', "%#{name}%")
    groups = groups.where('cast(subject_id as text) = ?', subject_id.to_s) if subject_id

    groups
  end

  scope :sort_by_time_preferences, ->(time_preferences:) do
    return unless time_preferences

    time_preferences = time_preferences
                       .split(',')
                       .map(&:capitalize)
                       .reject { |tp| TIME_PREFERENCES.exclude?(tp) }

    groups_set = []

    each do |group|
      count = 0
      time_preferences.each do |time_preference|
        count += group.time_preferences.values.count(time_preference)
      end
      groups_set << { id: group.id, amount: count }
    end

    group_ids = groups_set
                .sort_by { |gr| gr[:amount] }
                .reject { |gr| gr[:amount].zero? }
                .reverse
                .pluck(:id)

    find(group_ids)
  end

  def admin?(entity)
    if entity.is_a?(User)
      members.exists?(user: entity, role: 'admin')
    elsif entity.is_a?(Member)
      members.exists?(id: entity.id, role: 'admin')
    else
      false
    end
  end

  def admins
    members.where(role: 'admin')
  end

  def participants
    members.where(role: 'participant')
  end

  def promote_oldest_member!(excluding_member = nil)
    oldest_member_query = participants.order(:created_at)
    oldest_member_query = oldest_member_query.where.not(id: excluding_member.id) if excluding_member
    oldest_member_query.first&.promote!
  end

  private

  def validate_time_preferences
    return if time_preferences.blank?

    time_preferences.each_key do |key|
      unless DAY_PREFERENCES.include?(key) && TIME_PREFERENCES.include?(time_preferences[key])
        errors.add(:time_preferences,
                   'Debe tener una preferencia válida para cada día')
      end
    end
  end
end
