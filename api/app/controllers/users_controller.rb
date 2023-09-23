class UsersController < ApplicationController
  before_action :set_user

  def show
    render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
  end

  def careers
    careers = @user.careers.map do |career|
      CareerSerializer.new(career).serializable_hash[:data][:attributes]
    end

    render json: careers
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
