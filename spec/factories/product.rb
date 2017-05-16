FactoryGirl.define do
  factory :product do
    sequence :product_name do |n|
      "#{Faker::Pokemon.name} + #{n}"
    end
  end
end
