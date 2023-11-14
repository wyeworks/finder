class Request < ApplicationRecord
  # Enums
  enum status: { pending: 0, accepted: 1, rejected: 2 }

  # Associations
  belongs_to :user
  belongs_to :group

  # Validations
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validates :reason, presence: true, if: :rejected?
  validate :no_existing_pending_request, :user_not_group_member, on: :create
  validate :group_capacity

  # Before
  before_update :ensure_status_is_modifiable

  # After
  after_save :add_user_to_group, if: -> { saved_change_to_status? && accepted? }

  private

  def no_existing_pending_request
    existing_request = Request.where(user_id:, group_id:).exists?(status: :pending)

    errors.add(:general, 'Ya hay una solicitud pendiente para este usuario y grupo') if existing_request
  end

  def user_not_group_member
    return unless group&.users&.include?(user)

    errors.add(:user, 'Ya formas parte de este grupo')
  end

  def group_capacity
    return unless group && group.members.count >= group.size

    errors.add(:group, 'El grupo ya ha alcanzado su capacidad máxima')
  end

  def ensure_status_is_modifiable
    return unless status_changed? && (status_was == 'accepted' || status_was == 'rejected')

    errors.add(:status, 'No se puede modificar una solicitud que ya ha sido aceptada o rechazada')
    throw(:abort)
  end

  def add_user_to_group
    Member.create!(user:, group:, role: 'participant')
  end
end
