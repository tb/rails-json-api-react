Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createCategory, function: Resolvers::CreateCategory.new(Category)
  field :updateCategory, function: Resolvers::UpdateCategory.new(Category)
  field :deleteCategory, function: Resolvers::DeleteCategory.new(Category)

  field :createPost, Types::PostType do
    description "Create a post"

    argument :post, Types::PostInputType
    resolve ->(o, args, c) {
      Post.create(args[:post].to_h)
    }
  end

  field :updatePost, Types::PostType do
    description "Update a post"
    argument :post, Types::PostInputType
    resolve ->(o, args, c) {
      Post.update(args[:post][:id], args[:post].to_h.except!("id"))
    }
  end

  field :deletePost, Types::PostType do
    description "Delete a post"
    argument :id, types.Int
    resolve ->(o, args, c) {
      Post.destroy(args[:id])
    }
  end
end
