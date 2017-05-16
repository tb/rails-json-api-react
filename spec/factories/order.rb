FactoryGirl.define do
  factory :order do
    order_date { Faker::Date.between(10.days.ago, Date.today) }
    required_date { Faker::Date.between(10.days.ago, Date.today) }
    shipped_date { Faker::Date.between(10.days.ago, Date.today) }
    ship_via { 'DHL' }
    freight { rand(1000) }
    ship_name { 'Titanic' }
    ship_address { Faker::Address.street_name }
    ship_city { Faker::Address.city }
    ship_region { Faker::Address.state }
    ship_postal_code { Faker::Address.zip }
    ship_country { Faker::Address.country }
  end
end