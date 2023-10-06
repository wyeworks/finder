module GroupAdminConcern
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
end
