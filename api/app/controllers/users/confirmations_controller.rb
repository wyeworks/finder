module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # GET /users/confirmation?confirmation_token=
    def show
      self.resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      if resource.errors.empty?
        redirect_to 'https://www.google.com', allow_other_host: true
      else
        # TODO: redirect to generic error in front
        redirect_to 'https://www.error.com'
      end
    end
  end
end
