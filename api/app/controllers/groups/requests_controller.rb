module Groups
  class RequestsController < ApplicationController
    before_action :set_group
    before_action :authenticate_user!, except: %i[index show]

    def create
      @request = @group.requests.new(status: 'pending', user: current_user)

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
