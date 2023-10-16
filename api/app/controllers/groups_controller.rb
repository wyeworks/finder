class GroupsController < ApplicationController
  include GroupAdminConcern

  before_action :set_group, only: %i[show update destroy members]
  before_action :authorize_group_admin!, only: %i[update destroy]

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

  def group_params
    params.require(:group).permit(:name, :description, :size, :subject_id, time_preferences: {})
  end
end
