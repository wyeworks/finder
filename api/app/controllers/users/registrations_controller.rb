# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    skip_before_action :authenticate_user!

    private

    def respond_with(current_user, _opts = {})
      if resource.persisted?
        Rails.logger.info "User with ID ##{current_user.id} and " \
                          "email '#{current_user.email}' was successfully created."

        render json: {
          message: 'El usuario fue creado correctamente',
          user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }, status: :ok
      else
        Rails.logger.info "User with email '#{current_user.email}' couldn't be created due to the following " \
                          "errors: #{current_user.errors.full_messages}"

        render json: {
          message: 'El usuario no pudo ser creado correctamente',
          errors: current_user.errors.messages
        }, status: :unprocessable_entity
      end
    end
  end
end
