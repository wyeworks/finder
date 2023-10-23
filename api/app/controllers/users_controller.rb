class UsersController < ApplicationController
  before_action :set_user
  before_action :validate_current_user, except: :show
  before_action :handle_user_groups, only: :destroy

  def show
    render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
  end

  def update
    if update_params[:password].present?
      if @user.update_with_password(update_params)
        Rails.logger.info "User was successfully updated with params: '#{update_params}'"
        render json: UserSerializer.new(@user).serializable_hash[:data][:attributes], status: :ok
      else
        handle_errors
      end
    elsif @user.update(update_params.except(:current_password, :password))
      Rails.logger.info "User was successfully updated with params: '#{update_params}'"
      render json: UserSerializer.new(@user).serializable_hash[:data][:attributes], status: :ok
    else
      handle_errors
    end
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

  private

  def set_user
    @user = User.find(params[:id])
  end

  def validate_current_user
    return if current_user.id == @user.id

    render json: {
      errors: {
        user: ['No estás autorizado para realizar esta acción']
      }
    }, status: :unauthorized
  end

  def update_params
    params.require(:user)
          .permit(
            :current_password,
            :password,
            :name,
            :bio,
            :birth_date,
            social_networks: {},
            career_ids: [],
            subject_ids: []
          )
  end

  def handle_errors
    Rails.logger.info "User has the following validation errors: #{@user.errors.full_messages}"

    render json: {
      message: 'El usuario no pudo ser actualizado correctamente',
      errors: @user.errors.messages
    }, status: :unprocessable_entity
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
