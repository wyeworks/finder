Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:show, :update] do
    member do
      put 'upload_avatar'
    end
  end
end
