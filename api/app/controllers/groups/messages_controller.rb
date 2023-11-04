module Groups
  class MessagesController < ApplicationController
    before_action :set_group
    before_action :set_message, only: %i[update destroy]
    before_action :ensure_member_access, only: %i[index create update destroy]
    before_action :ensure_correct_user_or_admin, only: %i[destroy update]

    def index
      grouped_messages = Message.group_by_date(group_id: @group.id)

      serialized_grouped_messages = []
      grouped_messages.each do |date_and_messages|
        serialized_grouped_messages << {
          date: date_and_messages.first,
          messages: date_and_messages.second.map do |message|
            MessageSerializer.new(message).serializable_hash[:data][:attributes]
          end
        }
      end

      render json: serialized_grouped_messages
    end

    def create
      @message = Message.new(
        message_params.merge(
          group: @group,
          user: current_user,
          hour: DateTime.now
        )
      )
      if @message.save
        Rails.logger.info "Message was successfully created with params: '#{message_params}'"

        render json: MessageSerializer.new(@message).serializable_hash[:data][:attributes], status: :created
      else
        Rails.logger.info "Message has the following validation errors: #{@message.errors.full_messages}"

        render json: {
          message: 'El mensaje no pudo ser creado correctamente',
          errors: @message.errors.messages
        }, status: :unprocessable_entity
      end
    end

    def update
      if @message.update(message_params)
        Rails.logger.info "Message was successfully updated with params: '#{message_params}'"

        render json: MessageSerializer.new(@message).serializable_hash[:data][:attributes], status: :ok
      else
        Rails.logger.info "Message has the following validation errors: #{@message.errors.full_messages}"

        render json: {
          message: 'El mensaje no pudo ser actualizado correctamente',
          errors: @message.errors.messages
        }, status: :unprocessable_entity
      end
    end

    def destroy
      if @message.destroy
        Rails.logger.info "Message with ID ##{@message.id} was successfully destroyed."

        render json: { success: 'El mensaje fue eliminado exitosamente.' }, status: :ok
      else
        Rails.logger.info "Message has the following validation errors: #{@message.errors.full_messages}"

        render json: {
          errors: {
            message: ["No se pudo eliminar el mensaje con el ID ##{@message.id}"]
          }
        }, status: :unprocessable_entity
      end
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

      render json: { message: 'No estás autorizado para realizar esta acción' }, status: :unauthorized
    end

    def ensure_correct_user_or_admin
      return if @message.user == current_user || @group.admin?(current_user)

      render json: { message: 'No estás autorizado para realizar esta acción' }, status: :unauthorized
    end

    def message_params
      params.require(:message).permit(:content)
    end
  end
end
