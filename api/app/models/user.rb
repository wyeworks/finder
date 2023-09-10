class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  # Validations
  validates :name, presence: true
  validate :password_complexity, if: :password_present?

  private

  def password_complexity
    return if password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

    errors.add :password, 'Complexity requirement not met. ' \
                          'Please use: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end

  def password_present?
    password.present?
  end
end
