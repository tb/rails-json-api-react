class Resolvers::DeleteCategory < GraphQL::Function
  def initialize(model)
    @model = model
  end

  argument :id, !types.Int

  type Types::CategoryType

  def call(_obj, args, _ctx)
    @model.destroy(args[:id])
  end
end
