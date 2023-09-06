class User < ApplicationRecord
  has_one_attached :avatar
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :confirmable, :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  PASSWORD_REGEX = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.])/

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
