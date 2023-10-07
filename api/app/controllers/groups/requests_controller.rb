module Groups
  class RequestsController < ApplicationController
    include GroupAdminConcern
    before_action :set_group, :authenticate_user!
    before_action :set_request, only: :update
    before_action :authorize_group_admin!, only: %i[index update]

    def index
      requests = @group.requests.where(status: 'pending')
      serialized_requests = requests.map do |request|
        RequestSerializer.new(request).serializable_hash[:data][:attributes]
      end

      render json: serialized_requests
    end

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

    def show_for_user
      user = User.find(params[:user_id])
      request = @group.requests.find_by(user:)

      if request
        render json: RequestSerializer.new(request).serializable_hash[:data][:attributes], status: :ok
      else
        Rails.logger.info "No request found for User ID ##{params[:user_id]} in Group with ID ##{params[:group_id]}"

        error_message = "No se pudo encontrar la solicitud del usuario con el ID ##{params[:user_id]} " \
                        "para el grupo con el ID ##{params[:group_id]}"
        render json: {
          errors: {
            request: [error_message]
          }
        }, status: :not_found
      end
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

    def request_params
      params.permit(:status, :reason)
    end
  end
end
