class SessionsController < ApplicationController
  before_action :set_session, only: %i[show update destroy]
  before_action :authenticate_user!

  def show
    render json: SessionSerializer.new(@session).serializable_hash[:data][:attributes], status: :ok
  end

  def create
    @session = Session.new(session_params)

    if @session.save
      Rails.logger.info "Session was successfully created with params: '#{session_params}'"
      render json: SessionSerializer.new(@session).serializable_hash[:data][:attributes], status: :created
    else
      Rails.logger.info "Session has the following validation errors: #{@session.errors.full_messages}"

      render json: {
        message: 'La sesión no pudo ser creada correctamente',
        errors: @session.errors.messages
      }, status: :unprocessable_entity
    end
  end

  # Aca se habia hablando de que solo se pueden updatear ciertas cosas de la sesion
  # Podriamos agregar las validaciones
  def update
    if @session.update(session_params)
      Rails.logger.info "Session was successfully updated with params: '#{session_params}'"

      render json: SessionSerializer.new(@session).serializable_hash[:data][:attributes], status: :ok
    else
      Rails.logger.info "Session has the following validation errors: #{session.errors.full_messages}"

      render json: {
        message: 'La sesión no pudo ser actualizada correctamente',
        errors: @session.errors.messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @session.destroy
      Rails.logger.info 'Session was successfully deleted'

      head :no_content
    else
      Rails.logger.info "Session has the following validation errors: #{session.errors.full_messages}"

      render json: {
        message: 'La sesión no pudo ser borrada correctamente',
        errors: @session.errors.messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_session
    @session = Session.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error "Session with id '#{params[:id]}' not found"
    render json: { message: "No se pudo encontrar la sesion con el ID ##{params[:id]}" }, status: :not_found
  end

  def session_params
    params.require(:session).permit(:name, :description, :location, :meeting_link, :start_time, :end_time, :group_id)
  end

end
