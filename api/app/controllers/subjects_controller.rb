class SubjectsController < ApplicationController
  before_action :set_subject

  def show
    render json: SubjectSerializer.new(@subject).serializable_hash[:data][:attributes]
  end

  private

  def set_subject
    @subject = Subject.find(params[:id])
  end
end
