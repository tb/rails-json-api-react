Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createCategory, Types::CategoryType do
    description "Create a category"
    argument :category, Types::CategoryInputType
    resolve ->(o, args, c) {
      Category.create(args[:category].to_h)
    }
  end

  field :updateCategory, Types::CategoryType do
    description "Update a category"
    argument :category, Types::CategoryInputType
    resolve ->(o, args, c) {
      Category.update(args[:category][:id], args[:category].to_h.except!("id"))
    }
  end

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
end
