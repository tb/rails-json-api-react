Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :category do
    type Types::CategoryType
    argument :id, !types.ID
    description "Find a Category by ID"
    resolve ->(obj, args, ctx) { Category.find(args["id"]) }
  end

  field :categories do
    type types[Types::CategoryType]
    argument :id, types[types.ID]
    argument :with_posts, types.Boolean
    description "Find Categories"
    resolve ->(obj, args, ctx) {
      categories = (args["ids"] ? Category.where(id: args["ids"]) : Category.all)
      args["with_posts"] ? categories.includes(posts: :comments) : categories
    }
  end

  field :posts do
    type types[Types::PostType]
    argument :id, types[types.ID]
    description "Find Posts"
    resolve ->(obj, args, ctx) {
      args["ids"] ? Post.where(id: args["ids"]) : Post.all
    }
  end

  field :post do
    type Types::PostType
    argument :id, !types.ID
    description "Find a Post by ID"
    resolve ->(obj, args, ctx) { Post.find(args["id"]) }
  end
end
