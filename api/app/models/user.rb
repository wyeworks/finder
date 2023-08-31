class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Validations
  validates :name, :birth_date, presence: true
  validate :password_complexity

  private

  def password_complexity
    return if password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

    errors.add :password, 'Complexity requirement not met. ' \
                          'Please use: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end
end
