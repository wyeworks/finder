class ApplicationController < ActionController::API
  include RackSessionFix

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name birth_date])

    devise_parameter_sanitizer.permit(:account_update, keys: %i[bio avatar])
  end
end
