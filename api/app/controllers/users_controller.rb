class UsersController < ApplicationController
  before_action :set_user
  before_action :authenticate_user!, only: :destroy

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

  private

  def set_user
    @user = User.find(params[:id])
  end
end
