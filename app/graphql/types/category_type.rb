Types::CategoryType = GraphQL::ObjectType.define do
  name "Category"
  field :id, types.Int
  field :name, types.String
  field :created_at, types.String
end
