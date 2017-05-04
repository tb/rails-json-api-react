def random_image
  Faker::LoremPixel.image(
      '300x300',
      false,
      ['abstract', 'city', 'sports', 'nature'].sample,
      Random.rand(4)+1
  )
end

FactoryGirl.define do
  factory :post do
    title { Faker::Lorem.sentence }
  end

  trait :with_comments do
    comments { build_list :comment, 3 }
  end

  trait :with_parts do
    parts do
      [
          { imageUrl: random_image, type: 'image' },
          { text: Faker::Lorem.paragraph(2), type: 'text' },
          { text: Faker::Lorem.paragraphs(2), type: 'text' },
      ]
    end
  end
end
