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
    description "Find Categories"
    resolve ->(obj, args, ctx) {
      args["ids"] ? Category.where(id: args["ids"]) : Category.all
    }
  end
end
