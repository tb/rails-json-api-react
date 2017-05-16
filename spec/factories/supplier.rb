FactoryGirl.define do
  factory :supplier do
    company_name { Faker::Company.name }
    contact_name { Faker::Name.name }
    contact_title { Faker::Name.title }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    region { Faker::Address.state }
    postal_code { Faker::Address.postcode }
    country { Faker::Address.country }
    phone { Faker::PhoneNumber.cell_phone }
    fax { Faker::PhoneNumber.cell_phone }
    home_page { "http://#{Faker::Company.name}.com" }
  end
end
