class Resolvers::UpdateCategory < GraphQL::Function
  def initialize(model)
    @model = model
  end

  argument :category, !Types::CategoryInputType

  type Types::CategoryType

  def call(_obj, args, _ctx)
    param_key = @model.model_name.param_key
    @model.update(args[param_key][:id], args[param_key].to_h.except!("id"))
  end
end
