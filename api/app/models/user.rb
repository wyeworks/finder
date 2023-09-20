class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :confirmable, :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  # Constants
  PASSWORD_REGEX = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.])/

  # Associations
  has_many :members, dependent: :destroy
  has_many :groups, through: :members
  has_and_belongs_to_many :careers

  # Validations
  validates :name, presence: true
  validate :password_complexity

  private

  def password_complexity
    return if password.blank? || password =~ PASSWORD_REGEX

    errors.add :password, 'Complexity requirement not met. ' \
                          'Please use: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end
end
