class Resolvers::CreateCategory < GraphQL::Function
  def initialize(model)
    @model = model
  end

  argument :category, !Types::CategoryInputType

  type Types::CategoryType

  def call(_obj, args, _ctx)
    @model.create(args[@model.model_name.param_key].to_h)
  end
end
