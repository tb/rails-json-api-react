FactoryGirl.define do
  factory :customer do
    company_name { Faker::Company.name }
    contact_name { Faker::Name.name }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    region { Faker::Address.state }
    postal_code { Faker::Address.zip_code }
    country { Faker::Address.country }
    phone { Faker::PhoneNumber.phone_number }
    fax { Faker::PhoneNumber.phone_number }
  end
end
