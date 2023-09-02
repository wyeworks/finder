class HomeController < ApplicationController
  def index
    render json: { message: 'Still alive' }
  end
end
