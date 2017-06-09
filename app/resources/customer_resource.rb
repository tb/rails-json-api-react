class CustomerResource < JSONAPI::Resource
  extend ModelFilter
  attributes :company_name,
             :contact_name,
             :contact_title,
             :address,
             :city,
             :region,
             :postal_code,
             :country,
             :phone,
             :fax,
             :created_at

  paginator :paged
  model_filters :company_name_contains
end
