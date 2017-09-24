RailsJsonApiServerSchema = GraphQL::Schema.define do
  query Types::QueryType
  mutation Types::MutationType
  use BatchLoader::GraphQL
  max_depth 10
  rescue_from(ActiveRecord::RecordNotFound) { "Not found" }
end
