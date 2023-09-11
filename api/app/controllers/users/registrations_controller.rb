# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def update
      load_resource
      set_prev_unconfirmed_email

      resource_updated = update_resource(resource, account_update_params)
      log_update(resource_updated)

      yield resource if block_given?
      handle_resource_update_response(resource_updated)
    end

    protected

    def update_resource(resource, params)
      if params[:password].blank? && params[:password_confirmation].blank?
        resource.update_without_password(params)
      else
        resource.update(params)
      end
    end

    private

    def load_resource
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    end

    def set_prev_unconfirmed_email
      @prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)
    end

    def log_update(resource_updated)
      Rails.logger.debug { "Resource Updated? #{resource_updated}" }
      Rails.logger.debug { "Errors: #{resource.errors.full_messages.to_sentence}" } unless resource_updated
    end

    def handle_resource_update_response(resource_updated)
      if resource_updated
        handle_successful_update
      else
        clean_up_passwords resource
      end
      respond_with(resource)
    end

    def handle_successful_update
      flash_for_successful_update if is_flashing_format?
      # bypass_sign_in(resource) <-- Remove this line
    end

    def flash_for_successful_update
      flash_key = if update_needs_confirmation?(resource, @prev_unconfirmed_email)
                    :update_needs_confirmation
                  else
                    :updated
                  end
      set_flash_message :notice, flash_key
    end

    def respond_with(resource, _opts = {})
      if resource.persisted?
        Rails.logger.info "User with ID ##{current_user.id} and " \
                          "email '#{current_user.email}' was successfully created."

        render json: {
          message: resource.id_was.nil? ? 'Signed up successfully.' : 'Updated successfully.',
          user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }, status: :ok
      else
        Rails.logger.info "User with email '#{current_user.email}' couldn't be created due to " \
                          "the following errors: #{current_user.errors.full_messages}"

        render json: {
          message: "User couldn't be created successfully. " \
                   "#{current_user.errors.full_messages.to_sentence}",
          errors: current_user.errors.messages
        }, status: :unprocessable_entity
      end
    end

    def account_update_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name, :birth_date, :bio)
    end
  end
end
