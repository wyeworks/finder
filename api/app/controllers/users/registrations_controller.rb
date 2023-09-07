module Users
  class RegistrationsController < Devise::RegistrationsController
    require 'open-uri' # To open and download the image from the URL
    
    respond_to :json

    def update
      #hay una manera menos verbosa de hacer estoo??
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
      prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

      #esto no funca
      if params[:user][:avatar_url].present?
        downloaded_image = URI.open(params[:user][:avatar_url])
        resource.avatar.attach(io: downloaded_image, filename: "avatar.jpg")
      end

      resource_updated = update_resource(resource, account_update_params)
      puts "Resource Updated? #{resource_updated}" # Debugging line
      puts "Errors: #{resource.errors.full_messages.to_sentence}" unless resource_updated # Debugging line

      yield resource if block_given?
      if resource_updated
        if is_flashing_format?
          flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ? :update_needs_confirmation : :updated
          set_flash_message :notice, flash_key
        end
        bypass_sign_in(resource)
        respond_with(resource)
      else
        clean_up_passwords resource
        respond_with(resource)
      end
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

    def respond_with(current_user, _opts = {})
      if resource.persisted?
        render json: {
          message: 'Signed up successfully.',
          user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }, status: :ok
      else
        render json: {
          message: "User couldn't be updated successfully. " \
                   "#{current_user.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end

    def account_update_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name, :birth_date, :avatar, :bio, :avatar_url)
    end    
  end
end
