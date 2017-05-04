class PostResource < JSONAPI::Resource
  extend CustomFilter

  attributes :title, :created_at, :parts

  has_many :comments
  has_one :category

  paginator :paged

  filters :category
  custom_filter :title_contains
end
