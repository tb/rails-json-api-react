class CustomerResource < JSONAPI::Resource
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
end
