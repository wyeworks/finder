class UserController < ApplicationController
    before_action :authenticate_user!, only: [:update, :upload_avatar]
  
    def show
      @user = User.find(params[:id])
      render json: @user
    end
  
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: @user
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def upload_avatar
      @user = User.find(params[:id])
      @user.profile_pic.attach(params[:profile_pic])
      if @user.profile_pic.attached?
        render json: { avatar_url: url_for(@user.profile_pic) }
      else
        render json: { error: "Failed to upload." }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:bio, :time_slots, :profile_pic)
    end
  end
  