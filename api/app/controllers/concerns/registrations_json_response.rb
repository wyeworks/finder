module RegistrationsJsonResponse
  extend ActiveSupport::Concern

  def render_user_created_successfully(user, requires_confirmation: false)
    Rails.logger.info "User with ID ##{user.id} and email '#{user.email}' was successfully created."

    message = if requires_confirmation
                'El usuario fue creado correctamente, pero requiere confirmación'
              else
                'El usuario fue creado correctamente'
              end

    render json: {
      message:,
      user: UserSerializer.new(user).serializable_hash[:data][:attributes]
    }, status: :created
  end

  def render_user_creation_error(user)
    Rails.logger.info "User with email '#{user.email}' couldn't be created due to the following " \
                      "errors: #{user.errors.full_messages}"

    render json: {
      message: 'El usuario no pudo ser creado correctamente',
      errors: user.errors.messages
    }, status: :unprocessable_entity
  end

  def render_user_update_successfully(user)
    Rails.logger.info "User with ID ##{user.id} and email '#{user.email}' was successfully updated."

    render json: {
      message: 'El usuario fue actualizado correctamente',
      user: UserSerializer.new(user).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def render_user_update_error(user)
    Rails.logger.info "User with email '#{user.email}' couldn't be updated due to the following " \
                      "errors: #{user.errors.full_messages}"

    render json: {
      message: 'El usuario no pudo ser actualizado correctamente',
      errors: user.errors.messages
    }, status: :unprocessable_entity
  end
end
