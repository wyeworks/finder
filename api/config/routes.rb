Rails.application.routes.draw do
  root to: 'home#index'

  devise_for :users, path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }

  resources :careers, only: :index
  resources :subjects, only: [:index, :show]
  resources :users, only: :show
end
