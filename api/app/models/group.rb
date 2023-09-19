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
  belongs_to :subject

  # Validations
  validates :name, :size, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  validates :size, numericality: { only_integer: true }
  validate :validate_time_preferences

  private

  def validate_time_preferences
    return if time_preferences.blank?

    time_preferences.each_key do |key|
      unless DAY_PREFERENCES.include?(key) && TIME_PREFERENCES.include?(time_preferences[key])
        errors.add(:time_preferences, 'should have a valid time preference for each day')
      end
    end
  end
end
