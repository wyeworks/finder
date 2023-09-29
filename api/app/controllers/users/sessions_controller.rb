# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(current_user, _opts = {})
      Rails.logger.info "User with ID ##{current_user.id} and " \
                        "email '#{current_user.email}' was successfully logged in."

      render json: {
        message: 'Sesión iniciada correctamente',
        user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }, status: :ok
    end

    def respond_to_on_destroy
      if request.headers['Authorization'].present?
        jwt_payload = JWT.decode(request.headers['Authorization'].split.last,
                                 Rails.application.credentials.devise_jwt_secret_key!).first
        current_user = User.find(jwt_payload['sub'])
      end

      if current_user
        Rails.logger.info "User with ID ##{current_user.id} and " \
                          "email '#{current_user.email}' was successfully logged out."

        render json: {
          message: 'Sesión cerrada correctamente'
        }, status: :ok
      else
        Rails.logger.info "Couldn't find an active session for logging out."

        render json: {
          message: 'No se pudo encontrar una sesión activa'
        }, status: :unauthorized
      end
    end
  end
end
