# [rails-json-api-react](https://github.com/tb/rails-json-api-react)

## [DEMO](https://rails-json-api-react.herokuapp.com)

Demo user: user1@example.com / Secret123

## Setup app

    bundle
    rake db:setup
    cd client && yarn

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

### [graphiql](http://localhost:3001/graphiql)

Categories

     {
       categories {
         id
         name
       }
     }

Categories with posts

    {
      categories(with_posts: true) {
        id
        name
        posts {
          id
          title
          category {
            id
            name
          }
          comments {
            id
            body
          }
        }
      }
    }

One category
    
    {
      category(id: 1) {
        id
        name
      }
    }

Create category

    mutation {
      createCategory(category: {name: "Graphql"}) {
        id
        name
        errors
      }
    }

Update category

    mutation {
      updateCategory(category: {id: 1, name: "Graphql"}) {
        id
        name
        errors
      }
    }

Posts

    {
      posts {
        id
        title
        category {
          id
          name
        }
      }
    }

One post

    {
      post(id: 1) {
        id
        title
        category {
          id
          name
        }
        comments {
          id
          body
        }
      }
    }

Create post

    mutation {
      createPost(post: {title: "Graphql", category_id: 1}) {
        id
        title
        category {
          id
          name
        }
        errors
      }
    }

Update post

    mutation {
      updatePost(post: {id: 1, title: "Graphql", category_id: 1}) {
        id
        title
        category {
          id
          name
        }
        errors
      }
    }
