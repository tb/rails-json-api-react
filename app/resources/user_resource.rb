class UserResource < JSONAPI::Resource
  extend ModelFilter
  attributes :email, :confirmed_at, :created_at

  paginator :paged
  model_filters :email_contains
end
