class UsersController < ApplicationController
  before_action :set_user

  def show
    render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
