class PostResource < JSONAPI::Resource
  extend CustomFilter

  attributes :title, :body, :created_at

  has_many :comments
  has_one :category

  paginator :paged

  filters :category
  custom_filter :title_contains
end
