module Users
  class RegistrationsController < Devise::RegistrationsController
    require 'open-uri' # To open and download the image from the URL
    
    respond_to :json

    # Patch /user
    def update
      #si hay una forma menos verbosa de hacer esto aiuda
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
      prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

      # 
      if params[:user][:avatar_url].present?
        downloaded_image = URI.open(params[:user][:avatar_url]) # Use URI.open here
        resource.avatar.attach(io: downloaded_image, filename: "avatar.jpg")
      end

      resource_updated = update_resource(resource, account_update_params)
      yield resource if block_given?
      if resource_updated
        if is_flashing_format?
          flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ? :update_needs_confirmation : :updated
          set_flash_message :notice, flash_key
        end
        sign_in resource_name, resource, bypass: true
        respond_with(resource)
      else
        clean_up_passwords resource
        respond_with(resource)
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
          message: "User couldn't be created successfully. " \
                   "#{current_user.errors.full_messages.to_sentence}"
        }, status: :unprocessable_entity
      end
    end

    def account_update_params
      params.require(:user).permit(:email, :password, :password_confirmation, :current_password, :name, :birth_date, :avatar, :bio, :avatar_url)
    end
  end
end
