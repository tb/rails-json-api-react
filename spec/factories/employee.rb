FactoryGirl.define do
  factory :employee do
    last_name { Faker::Name.last_name }
    first_name { Faker::Name.first_name }
    title { Faker::Name.title }
    title_of_courtesy { Faker::Name.title }
    birth_date { Faker::Date.backward(720) }
    hire_date { Faker::Date.backward(10) }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    region { Faker::Address.state }
    postal_code { Faker::Address.postcode }
    country { Faker::Address.country }
    home_phone { Faker::PhoneNumber.phone_number }
    extension { 'jpg' }
    photo { Faker::Placeholdit.image("50x50") }
    notes { Faker::Lorem.paragraph }
    created_at { Faker::Date.backward(20) }
    updated_at { Faker::Date.backward(15) }
  end
end
