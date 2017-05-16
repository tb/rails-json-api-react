class OrderResource < JSONAPI::Resource
  attributes :order_date, :required_date, :shipped_date, :ship_via, :freight, :ship_name, :ship_address, :ship_city,
             :ship_region, :ship_postal_code, :ship_country
end
