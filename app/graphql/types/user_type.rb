Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, types.Int
  field :email, types.String
  field :errors, Types::JSONType
end

Types::UserInputType = GraphQL::InputObjectType.define do
  name "PostInput"

  argument :id, types.Int
  argument :email, types.String
end
