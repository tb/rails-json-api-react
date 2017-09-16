Types::CategoryType = GraphQL::ObjectType.define do
  name "Category"

  field :id, types.Int
  field :name, types.String
  field :created_at, types.String
  field :posts, types[Types::PostType]
  field :errors, Types::JSONType
end

Types::CategoryInputType = GraphQL::InputObjectType.define do
  name "CategoryInput"

  argument :id, types.Int
  argument :name, types.String
end
