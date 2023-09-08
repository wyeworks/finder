module Users
  class ConfirmationsController < Devise::ConfirmationsController
    private
    def after_confirmation_path_for(resource_name, resource)
      #new_session_path(resource_name)
      #Rails.logger.debug "Estoy en after_confirmation_path_for"
      #Código para redirigir luego de confirmar"
      'https://www.google.com'
    end
  end
end