# README

## Rails API app setup

    rails new . -d postgresql --skip-javascript --api -T

## jsonapi-resources setup

### Models

    rails g model category name:string
    rails g model post title:string body:text category:references
    rails g model comment body:text post:references

### Resources

    rails generate jsonapi:resource category
    rails generate jsonapi:resource post
    rails generate jsonapi:resource model

### Controllers

    rails g controller Category --skip-assets
    rails g controller Posts --skip-assets
    rails g controller Comments --skip-assets

### Routes

    jsonapi_resources :categories
    jsonapi_resources :posts
    jsonapi_resources :comments

### Start app
    foreman start
