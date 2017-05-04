FactoryGirl.define do
  factory :category do
    name { Faker::Lorem.words(2).join(' ').capitalize }
  end

  trait :with_posts do
    posts { build_list :post, 5, :with_comments, :with_parts }
  end
end
