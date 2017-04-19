Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  jsonapi_resources :categories
  jsonapi_resources :posts
  jsonapi_resources :comments
  jsonapi_resources :users
end
