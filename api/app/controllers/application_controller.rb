class ApplicationController < ActionController::API
  include RackSessionFix

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # For sign-up
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name birth_date])

    # For account updates
    devise_parameter_sanitizer.permit(:account_update, keys: %i[bio avatar])
  end
end
