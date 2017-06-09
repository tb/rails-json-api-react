Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  mount_devise_token_auth_for 'User', at: 'auth'
  jsonapi_resources :categories
  jsonapi_resources :comments
  jsonapi_resources :posts
  jsonapi_resources :users
  jsonapi_resources :roles
  jsonapi_resources :employees
  jsonapi_resources :orders
  jsonapi_resources :customers
  jsonapi_resources :suppliers
  jsonapi_resources :products
end
