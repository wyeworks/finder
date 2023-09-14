# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def update
      load_resource
      set_prev_unconfirmed_email

      resource_updated = update_resource(resource, account_update_params)

      yield resource if block_given?
      handle_resource_update_response(resource_updated)
    end

    protected

    def update_resource(resource, params)
      if params[:password].present?
        resource.update_with_password(params)
      else
        resource.update_without_password(params)
      end

      resource.password = params[:password] if params[:password].present?
      resource.valid?

      if resource.errors.any?
        false
      else
        resource.save
      end
    end

    private

    def load_resource
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    end

    def set_prev_unconfirmed_email
      @prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)
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
    end

    def flash_for_successful_update
      flash_key = if update_needs_confirmation?(resource, @prev_unconfirmed_email)
                    :update_needs_confirmation
                  else
                    :updated
                  end
      set_flash_message :notice, flash_key
    end

    def respond_with(current_user, _opts = {})
      if current_user.errors.any?
        Rails.logger.info "User with email '#{current_user.email}' couldn't be updated due to " \
                          "the following errors: #{current_user.errors.full_messages}"

        render json: {
          message: "User couldn't be updated successfully. " \
                   "#{current_user.errors.full_messages.to_sentence}",
          errors: current_user.errors.messages
        }, status: :unprocessable_entity
      else
        Rails.logger.info "User with ID ##{current_user.id} and " \
                          "email '#{current_user.email}' was successfully updated."

        render json: {
          message: 'Updated successfully.',
          user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }, status: :ok
      end
    end

    def account_update_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name, :birth_date, :bio)
    end
  end
end
