# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

FactoryGirl.find_definitions

FactoryGirl.create_list(:category, 15, :with_posts)

25.times do |n|
  User.create(email: "user#{n}@example.com", password: 'Secret99', confirmed_at: Time.now)
end
