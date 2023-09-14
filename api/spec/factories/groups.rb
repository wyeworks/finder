FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Name_#{n}" }
    description { 'Description' }
    sequence(:course) { |n| "Course_#{n}" }
    size { 3 }
    days { 'Monday' }
    time_preference { 'Morning' }
  end
end
