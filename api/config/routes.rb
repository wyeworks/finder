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
  resources :groups, except: [:new, :edit] do
    get :members, on: :member
    resources :requests, only: [:create, :index, :update], module: :groups do
      get 'users/:user_id', to: 'requests#show_for_user', on: :collection
    end
    resources :messages, module: :groups, except: :show
  end
  resources :members, only: :destroy
  resources :sessions, only: [:create, :show, :update, :destroy]
  resources :subjects, only: [:index, :show]
  resources :users, only: [:show, :update, :destroy]
end
