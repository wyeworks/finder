module Groups
  class RequestsController < ApplicationController
    before_action :set_group
    before_action :authenticate_user!
    before_action :set_request, :authorize_admin!, only: :update

    def create
      @request = Request.new(status: 'pending', user: current_user, group: @group)

      if @request.save
        Rails.logger.info 'Request was successfully created'
        render json: RequestSerializer.new(@request).serializable_hash[:data][:attributes], status: :created
      else
        Rails.logger.info "Request has the following validation errors: #{@request.errors.full_messages}"

        render json: {
          message: 'La solicitud no pudo ser creada correctamente',
          errors: @request.errors.messages
        }, status: :unprocessable_entity
      end
    end

    def update
      if @request.update(request_params)
        Rails.logger.info 'Request was successfully updated'
        render json: RequestSerializer.new(@request).serializable_hash[:data][:attributes], status: :ok
      else
        Rails.logger.info "Request has the following validation errors: #{@request.errors.full_messages}"

        render json: {
          message: 'La solicitud no pudo ser actualizada correctamente',
          errors: @request.errors.messages
        }, status: :unprocessable_entity
      end
    rescue ArgumentError => e
      render json: {
        message: 'La solicitud contiene valores no válidos',
        errors: { status: [e.message] }
      }, status: :unprocessable_entity
    end

    private

    def set_group
      @group = Group.find(params[:group_id])
    rescue ActiveRecord::RecordNotFound
      Rails.logger.info "Couldn't find Group with ID ##{params[:group_id]}"

      render json: {
        errors: {
          group: ["No se pudo encontrar el grupo con el ID ##{params[:group_id]}"]
        }
      }, status: :not_found
    end

    def set_request
      @request = @group.requests.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      Rails.logger.info "Couldn't find Request with ID ##{params[:id]} for Group with ID ##{params[:group_id]}"

      error_message = "No se pudo encontrar la solicitud con el ID ##{params[:id]} " \
                      "para el grupo con el ID ##{params[:group_id]}"
      render json: {
        errors: {
          request: [error_message]
        }
      }, status: :not_found
    end

    def authorize_admin!
      return if @group.admin?(current_user)

      Rails.logger.info "User with ID ##{current_user.id} is not this group's Admin"

      render json: {
        errors: {
          request: ["El usuario con ID ##{current_user.id} no es administrador de este grupo"]
        }
      }, status: :unauthorized
    end

    def request_params
      params.permit(:status, :reason)
    end
  end
end
