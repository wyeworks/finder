class CareersController < ApplicationController
  def index
    careers = Career.all.map do |career|
      CareerSerializer.new(career).serializable_hash[:data][:attributes]
    end

    render json: careers
  end
end
