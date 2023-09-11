class HomeController < ApplicationController
  def index
    Rails.logger.info 'Health Check: still alive!'

    render json: { message: 'Still alive' }
  end
end
