class AttendancesController < ApplicationController
  include GroupAuthorizable

  before_action :set_attendance, :set_session
  before_action :authorize_group_member!

  def update
    if @attendance.update(attendance_params)
      Rails.logger.info "Attendance was successfully updated with params: '#{attendance_params}'"

      render json: AttendanceSerializer.new(@attendance).serializable_hash[:data][:attributes], status: :ok
    else
      Rails.logger.info "Attendance has the following validation errors: #{@attendance.errors.full_messages}"

      render json: {
        message: 'La asistencia no pudo ser actualizada correctamente',
        errors: @attendance.errors.messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_attendance
    @attendance = Attendance.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.info "Couldn't find Attendance with ID ##{params[:id]}"

    render json: {
      errors: {
        attendance: ["No se pudo encontrar la asistencia con ID ##{params[:id]}"]
      }
    }, status: :not_found
  end

  def set_session
    @session = @attendance.session
  end

  def attendance_params
    params.require(:attendance).permit(:status)
  end
end
