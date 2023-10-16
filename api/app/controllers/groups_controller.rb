class GroupsController < ApplicationController
  include GroupAdminConcern

  before_action :set_group, only: %i[show update destroy members remove_member]
  before_action :authorize_group_admin!, only: %i[update destroy]
  before_action :set_member, only: :remove_member
  before_action :handle_group_consistency, only: :remove_member

  def index
    groups = Group.all.map do |group|
      GroupSerializer.new(group).serializable_hash[:data][:attributes]
    end

    render json: groups
  end

  def show
    render json: GroupSerializer.new(@group,
                                     { params: { current_user: } }).serializable_hash[:data][:attributes]
  end

  def create
    @group = Group.new(group_params)

    if @group.save
      @group.members.create(user: current_user, role: 'admin')

      Rails.logger.info "Group was successfully created with params: '#{group_params}'"

      render json: GroupSerializer.new(@group).serializable_hash[:data][:attributes], status: :created
    else
      Rails.logger.info "Group has the following validation errors: #{@group.errors.full_messages}"

      render json: {
        message: 'El grupo no pudo ser creado correctamente',
        errors: @group.errors.messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @group.update(group_params)
      Rails.logger.info "Group was successfully updated with params: '#{group_params}'"

      render json: GroupSerializer.new(@group).serializable_hash[:data][:attributes], status: :ok
    else
      Rails.logger.info "Group has the following validation errors: #{@group.errors.full_messages}"

      render json: {
        message: 'El grupo no pudo ser actualizado correctamente',
        errors: @group.errors.messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @group.destroy
      Rails.logger.info 'Group was successfully deleted'

      head :no_content
    else
      Rails.logger.info "Group has the following validation errors: #{@group.errors.full_messages}"

      render json: {
        message: 'El grupo no pudo ser borrado correctamente',
        errors: @group.errors.messages
      }, status: :unprocessable_entity
    end
  end

  def members
    members = @group.members
    serialized_members = members.map do |member|
      MemberSerializer.new(member).serializable_hash[:data][:attributes]
    end
    render json: serialized_members
  end

  def remove_member
    unless current_user.id == @member.user_id || @group.members.find_by(user: current_user, role: 'admin')
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
        errors: @group.errors.messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_group
    @group = Group.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.info "Couldn't find Group with ID ##{params[:id]}"

    render json: {
      errors: {
        group: ["No se pudo encontrar el grupo con el ID ##{params[:id]}"]
      }
    }, status: :not_found
  end

  def set_member
    @member = @group.members.find_by(user_id: params[:user_id])

    return if @member

    Rails.logger.info "Couldn't find User with ID ##{params[:user_id]}"

    render json: {
      errors: {
        member: ["No se pudo encontrar el usuario con el ID ##{params[:user_id]}"]
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
        group.promote_oldest_member!
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

  def group_params
    params.require(:group).permit(:name, :description, :size, :subject_id, time_preferences: {})
  end
end
