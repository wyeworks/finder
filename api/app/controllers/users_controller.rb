class UsersController < ApplicationController
  before_action :set_user, :authenticate_user!
  before_action :handle_user_groups, only: :destroy

  def show
    render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
  end

  def destroy
    if @user.destroy
      Rails.logger.info 'User was successfully deleted'

      head :no_content
    else
      Rails.logger.info "User has the following validation errors: #{@user.errors.full_messages}"

      render json: {
        message: 'El usuario no pudo ser borrado correctamente',
        errors: @user.errors.messages
      }, status: :unprocessable_entity
    end
  end

  def careers
    careers = @user.careers.map do |career|
      CareerSerializer.new(career).serializable_hash[:data][:attributes]
    end

    render json: careers
  end

  def subjects
    subjects = @user.subjects.map do |subject|
      SubjectSerializer.new(subject).serializable_hash[:data][:attributes]
    end

    render json: subjects
  end

  def groups
    groups = @user.groups.map do |group|
      GroupSerializer.new(group).serializable_hash[:data][:attributes]
    end

    render json: groups
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.info "Couldn't find User with ID ##{params[:id]}"

    render json: {
      errors: {
        user: ["No se pudo encontrar el usuario con el ID ##{params[:id]}"]
      }
    }, status: :not_found
  end

  def handle_user_groups
    @user.groups.each do |group|
      next unless group.admin?(@user)

      if group.admins.count == 1
        if group.members.count == 1
          group.destroy

          Rails.logger.info "Group ##{group.id} was successfully deleted"
        else
          group.promote_oldest_member!

          Rails.logger.info "Oldest member has been promoted as admin for group ##{group.id}"
        end
      end
    rescue ActiveRecord::RecordInvalid
      Rails.logger.info "Couldn't promote oldest member for one of the user's groups"

      render json: {
        errors: {
          group: ['No se pudo promover al participante más antiguo de uno de los grupos de este usuario']
        }
      }, status: :unprocessable_entity
    end
  end
end
