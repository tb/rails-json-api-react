class SupplierResource < JSONAPI::Resource
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
             :home_page
end
