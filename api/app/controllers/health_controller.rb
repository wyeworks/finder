class HealthController < ApplicationController
  def index
    render json: 'Still alive...', status: :ok
  end
end
