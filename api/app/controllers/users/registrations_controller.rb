# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    include RegistrationsJsonResponse

    def create
      build_resource(sign_up_params)

      resource.save
      yield resource if block_given?

      if resource.persisted?
        if resource.active_for_authentication?
          sign_up(resource_name, resource)
        else
          expire_data_after_sign_in!
        end
        render_user_created_successfully(resource, requires_confirmation: true)
      else
        clean_up_passwords resource
        render_user_creation_error(resource)
      end
    end

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

    def respond_with(resource, _opts = {})
      if action_name == 'update'
        if resource.errors.any?
          render_user_update_error(resource)
        else
          render_user_update_successfully(resource)
        end
      else
        super
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

    def account_update_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name, :birth_date, :bio)
    end
  end
end
