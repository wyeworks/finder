class SubjectsController < ApplicationController
  before_action :set_subject, only: :show

  def index
    subjects = Subject.all.map do |subject|
      SubjectSerializer.new(subject).serializable_hash[:data][:attributes]
    end

    render json: subjects
  end

  def show
    render json: SubjectSerializer.new(@subject).serializable_hash[:data][:attributes]
  end

  private

  def set_subject
    @subject = Subject.find(params[:id])
  end
end
