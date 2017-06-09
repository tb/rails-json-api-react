class ProductResource < JSONAPI::Resource
  attributes :product_name, :created_at

  paginator :paged
end
