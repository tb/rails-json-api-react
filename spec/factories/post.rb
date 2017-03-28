FactoryGirl.define do
  factory :post do
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
  end

  trait :with_comments do
    comments { build_list :comment, 3 }
  end
end