module Groups
  class MessagesController < ApplicationController
    before_action :set_group
    before_action :set_message, only: %i[show update destroy]
    before_action :ensure_member_access, only: %i[index show create update destroy]
    before_action :ensure_correct_user_or_admin, only: %i[destroy update]
    def index
      messages = @group.messages
      serialized_messages = messages.map do |message|
        MessageSerializer.new(message).serializable_hash[:data][:attributes]
      end
      render json: serialized_messages
    end

    def show; end

    def create
      @message = @group.messages.new(message_params)
      @message.user = current_user
      @message.hour = DateTime.now

      if @message.save
        render :show, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def update
      if @message.update(message_params)
        render :show, status: :ok
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @message.destroy
      head :no_content
    end

    private

    def set_group
      @group = Group.find_by(id: params[:group_id])
      return if @group

      Rails.logger.info "Couldn't find Group with ID ##{params[:group_id]}"
      render json: {
        errors: {
          group: ["No se pudo encontrar el grupo con el ID ##{params[:group_id]}"]
        }
      }, status: :not_found
    end

    def set_message
      @message = @group.messages.find(params[:id])
    end

    def ensure_member_access
      return if @group.users.include?(current_user)

      render json: { error: 'Not Authorized' }, status: :forbidden
    end

    def ensure_correct_user_or_admin
      return if @message.user == current_user || @group.admin?(current_user)

      render json: { error: 'Not Authorized' }, status: :forbidden
    end

    def message_params
      params.require(:message).permit(:content)
    end
  end
end
