Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  jsonapi_resources :categories
  jsonapi_resources :comments
  jsonapi_resources :posts
  jsonapi_resources :products
  jsonapi_resources :users
  jsonapi_resources :roles
  jsonapi_resources :employees
  jsonapi_resources :orders
  jsonapi_resources :customers
  jsonapi_resources :suppliers
end
