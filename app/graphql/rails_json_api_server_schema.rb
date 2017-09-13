RailsJsonApiServerSchema = GraphQL::Schema.define do
  query(Types::QueryType)
  use BatchLoader::GraphQL
end
