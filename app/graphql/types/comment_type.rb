Types::CommentType = GraphQL::ObjectType.define do
  name "Comment"

  field :id, types.Int
  field :body, types.String
  field :created_at, types.String
  field :post, Types::PostType
end
