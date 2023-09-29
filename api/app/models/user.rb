class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :confirmable, :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  # Constants
  PASSWORD_REGEX = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.])/

  # Associations
  has_many :members, dependent: :destroy
  has_many :groups, through: :members
  has_many :requests, dependent: :destroy
  has_and_belongs_to_many :careers
  has_and_belongs_to_many :subjects

  # Validations
  validates :name, presence: true
  validate :password_complexity

  private

  def password_complexity
    return if password.blank? || password =~ PASSWORD_REGEX

    errors.add :password, 'No se cumplen los requerimientos de complejidad de la contraseña. ' \
                          'Por favor utilizar: 1 mayúscula, 1 minúscula, 1 dígito y un carácter especial'
  end
end
