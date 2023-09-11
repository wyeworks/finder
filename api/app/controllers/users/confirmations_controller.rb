module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # GET /users/confirmation?confirmation_token=
    def show
      resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      if resource.errors.empty?
        # TODO: redirect to finder home page
        redirect_to "#{Rails.configuration.client_base_url}signin", allow_other_host: true
      else
        # TODO: redirect to generic error in front
        redirect_to Rails.configuration.client_base_url, allow_other_host: true
      end
    end
  end
end
