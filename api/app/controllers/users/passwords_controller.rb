module Users
  class PasswordsController < Devise::PasswordsController
    respond_to :json

    # Skip authentication, user might not know his password
    skip_before_action :authenticate_user!, only: %i[create update]

    def create
      self.resource = resource_class.send_reset_password_instructions(resource_params)

      if successfully_sent?(resource)
        Rails.logger.info "Reset password instructions sent to '#{resource.email}' successfully."
        render json: { message: "Instrucciones enviadas correctamente a #{resource.email}." },
               status: :ok
      else
        Rails.logger.info "Failed to send instructions to '#{resource.email}' due to: #{resource.errors.full_messages}"
        render json: {
          message: 'No se pudieron enviar las instrucciones para reestablecer la contraseña.',
          errors: resource.errors.messages
        }, status: :unprocessable_entity
      end
    end

    def update
      user_by_email = User.find_by(email: resource_params[:email])

      if user_by_email && Devise.token_generator.digest(
        User, :reset_password_token, resource_params[:reset_password_token]
      ) == user_by_email.reset_password_token
        self.resource = resource_class.reset_password_by_token(resource_params)

        if resource.errors.empty?
          Rails.logger.info "Password for user with email '#{resource.email}' was reset successfully."
          render json: { message: 'Contraseña reestablecida correctamente.' }, status: :ok
        else
          Rails.logger.info 'Failed to reset password for user with email ' \
                            "'#{resource.email}' due to the following errors: #{resource.errors.full_messages}"
          render json: {
            message: 'No se pudo reestablecer la contraseña.',
            errors: resource.errors.messages
          }, status: :unprocessable_entity
        end
      else
        Rails.logger.info 'Failed to reset password due to mismatched email or token.'
        render json: {
          message: 'No se pudo reestablecer la contraseña debido a un correo electrónico o token no coincidentes.',
          errors: { email: ['El correo electrónico proporcionado no coincide con el token.'] }
        }, status: :unprocessable_entity
      end
    end
  end
end
