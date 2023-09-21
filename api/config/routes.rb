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

  resources :subjects, only: [:index, :show] do
    get 'groups', to: 'groups#subject_groups', on: :member
  end

  resources :groups, except: [:new, :edit]

  resources :users, only: :show
end
