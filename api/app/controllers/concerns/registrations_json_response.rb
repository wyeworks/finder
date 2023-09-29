module RegistrationsJsonResponse
  extend ActiveSupport::Concern

  def render_user_created_successfully(user, requires_confirmation: false)
    message = if requires_confirmation
                'User was successfully created, but requires confirmation.'
              else
                'User was successfully created.'
              end

    render json: {
      message:,
      user: UserSerializer.new(user).serializable_hash[:data][:attributes]
    }, status: :created
  end

  def render_user_creation_error(user)
    render json: {
      message: "User couldn't be created successfully. #{user.errors.full_messages.to_sentence}",
      errors: user.errors.messages
    }, status: :unprocessable_entity
  end

  def render_user_update_successfully(user)
    Rails.logger.info "User with ID ##{user.id} and email '#{user.email}' was successfully updated."
    render json: {
      message: 'User was successfully updated.',
      user: UserSerializer.new(user).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def render_user_update_error(user)
    Rails.logger.info "User with email '#{user.email}' couldn't be updated due to the following " \
                      "errors: #{user.errors.full_messages}"

    render json: {
      message: "User couldn't be updated successfully. #{user.errors.full_messages.to_sentence}",
      errors: user.errors.messages
    }, status: :unprocessable_entity
  end
end
