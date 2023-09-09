# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private

    def respond_with(current_user, _opts = {})
      if resource.persisted?
        Rails.logger.info "User with ID ##{current_user.id} and " \
                          "email '#{current_user.email}' was successfully created."

        render json: {
          message: 'Signed up successfully.',
          user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }, status: :ok
      else
        Rails.logger.info "User with email '#{current_user.email}' couldn't be created due to " \
                          "the following errors: #{current_user.errors.full_messages}"

        render json: {
          message: "User couldn't be created successfully. " \
                   "#{current_user.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end
  end
end
