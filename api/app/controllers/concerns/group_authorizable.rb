module GroupAuthorizable
  extend ActiveSupport::Concern

  private

  def authorize_group_admin!
    return if @group.admin?(current_user)

    Rails.logger.info "User with ID ##{current_user.id} is not this group's Admin"

    render json: {
      errors: {
        group: ["El usuario con ID ##{current_user.id} no es administrador de este grupo"]
      }
    }, status: :unauthorized
  end

  def authorize_group_member!
    group = @session ? @session.group : Group.find(session_params[:group_id])

    member = Member.find_by(user: current_user, group:)

    return if member

    render json: { message: 'No estás autorizado para realizar esta acción' }, status: :unauthorized
  end

  def authorize_creator_or_group_admin!
    is_admin = @session.group.admin?(current_user)
    is_creator = @session.creator == current_user

    return if is_admin || is_creator

    render json: { message: 'No estás autorizado para realizar esta acción' }, status: :unauthorized
  end
end
