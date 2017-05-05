class PostResource < JSONAPI::Resource
  extend ModelFilter

  attributes :title, :created_at, :parts

  has_many :comments
  has_one :category

  paginator :paged

  filters :category
  model_filters :title_contains
end
