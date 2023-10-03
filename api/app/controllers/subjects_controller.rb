class SubjectsController < ApplicationController
  before_action :set_subject, only: :show
  after_action { pagy_headers_merge(@pagy) if @pagy }

  def index
    @pagy, @records = pagy(Subject.all)
    render json: { data: @records }
  end

  def show
    render json: SubjectSerializer.new(@subject).serializable_hash[:data][:attributes]
  end

  private

  def set_subject
    @subject = Subject.find(params[:id])
  end
end
