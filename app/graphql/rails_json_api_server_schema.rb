RailsJsonApiServerSchema = GraphQL::Schema.define do
  query(Types::QueryType)

  # GraphQL::Batch setup:
  use GraphQL::Batch
end
