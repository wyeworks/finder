module Users
  class ConfirmationsController < Devise::ConfirmationsController
    skip_before_action :authenticate_user!

    # The reason behind overriding the `show` action here instead of using the
    # one from Devise is the fact that redirection cannot be to the root_path
    # of the Rails application, but instead to the home path of the FE application.
    def show
      resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      redirect_to Rails.configuration.client_base_url, allow_other_host: true
    end
  end
end
