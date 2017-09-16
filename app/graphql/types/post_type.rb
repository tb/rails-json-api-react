Types::PostType = GraphQL::ObjectType.define do
  name "Post"

  field :id, types.Int
  field :title, types.String
  field :created_at, types.String
  field :category do
    type Types::CategoryType
    resolve ->(obj, args, ctx) {
      BatchLoader.for(obj.category_id).batch do |ids, loader|
        Category.where(id: ids).each { |record| loader.call(record.id, record) }
      end
    }
  end
  field :comments, types[Types::CommentType]
  field :errors, Types::JSONType
end

Types::PostInputType = GraphQL::InputObjectType.define do
  name "PostInput"

  argument :id, types.Int
  argument :title, types.String
  argument :category_id, types.Int
end
