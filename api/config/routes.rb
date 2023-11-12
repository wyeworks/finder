Rails.application.routes.draw do
  root to: 'home#index'

  devise_for :users, path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords'
  }

  resources :attendances, only: :update
  resources :careers, only: :index
  resources :groups do
    get :members, on: :member
    resources :messages, module: :groups, except: :show
    resources :requests, only: [:create, :index, :update], module: :groups do
      get 'users/:user_id', to: 'requests#show_for_user', on: :collection
    end
  end
  resources :members, only: [:update, :destroy]
  resources :sessions, only: [:create, :show, :update, :destroy]
  resources :subjects, only: [:index, :show]
  resources :users, only: [:show, :update, :destroy]

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
end
