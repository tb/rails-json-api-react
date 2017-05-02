# [rails-json-api-react](https://github.com/tb/rails-json-api-react)

## [DEMO](https://rails-json-api-react.herokuapp.com)

Demo user: user1@example.com / Secret123

## Setup app

    bundle
    rake db:setup
    cd client && npm i

## Start app

    foreman start
    open http://localhost:3000

## Adding new JSON API resource

    rails g model category name:string
    rails generate jsonapi:resource category
    rails g controller Category --skip-assets

### routes.rb

    jsonapi_resources :categories

### Client

Add list, edit and form components in `client/src/components/` based on one of existing.
