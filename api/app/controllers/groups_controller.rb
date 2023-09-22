class GroupsController < ApplicationController
  before_action :set_group, only: %i[show update destroy]
  before_action :authenticate_user!, except: %i[index show]
  before_action :authorize_admin!, only: %i[update destroy]

  def index
    groups = Group.all.map do |group|
      GroupSerializer.new(group).serializable_hash[:data][:attributes]
    end

    render json: groups
  end

  def show
    render json: GroupSerializer.new(@group).serializable_hash[:data][:attributes]
  end

  def create
    @group = Group.new(group_params)
    @group.subject = Subject.find(params[:subject_id]) if params[:subject_id]

    if @group.save
      @group.members.create(user: current_user, role: 'admin')
      render json: GroupSerializer.new(@group).serializable_hash[:data][:attributes], status: :created
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def update
    if @group.update(group_params)
      render json: @group, status: :ok
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @group.destroy
      head :no_content
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  private

  def set_group
    @group = Group.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Group not found' }, status: :not_found
  end

  def group_params
    params.require(:group).permit(:name, :description, :size, :subject_id, time_preferences: {})
  end

  def authorize_admin!
    head :forbidden unless @group.admin?(current_user)
  end
end
