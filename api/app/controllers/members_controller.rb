class MembersController < ApplicationController
  before_action :set_member, only: :destroy
  before_action :handle_group_consistency, only: :destroy

  def destroy
    unless current_user.id == @member.user_id || @member.group.admin?(current_user)
      render json: {
        errors: {
          member: ['No autorizado']
        }
      }, status: :unauthorized
      return
    end

    if @member.destroy
      head :no_content
    else
      Rails.logger.info "Member has the following validation errors: #{@member.errors.full_messages}"

      render json: {
        message: 'El miembro no pudo ser eliminado correctamente',
        errors: @member.errors.messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_member
    @member = Member.find_by(id: params[:id])

    return if @member

    Rails.logger.info "Couldn't find Member with ID ##{params[:id]}"
    render json: {
      errors: {
        member: ["No se pudo encontrar el miembro con el ID ##{params[:id]}"]
      }
    }, status: :not_found
  end

  def handle_group_consistency
    group = @member.group

    if group.admin?(@member) && (group.admins.count == 1)
      if group.members.count == 1
        group.destroy
        Rails.logger.info "Group ##{group.id} was successfully deleted"
      else
        group.promote_oldest_member!(@member)
        Rails.logger.info "Oldest member has been promoted as admin for group ##{group.id}"
      end
    end
  rescue ActiveRecord::RecordInvalid
    Rails.logger.info "Couldn't promote oldest member for the group"

    render json: {
      errors: {
        group: ['No se pudo promover al participante más antiguo del grupo']
      }
    }, status: :unprocessable_entity
  end
end
