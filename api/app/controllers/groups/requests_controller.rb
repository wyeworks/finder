module Groups
  class RequestsController < ApplicationController
    include GroupAdminConcern
    before_action :set_group
    before_action :authenticate_user!

    def index
      return unless authorize_group_admin!

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
  end
end
