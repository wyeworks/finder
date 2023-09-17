FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Name_#{n}" }
    description { 'Description' }
    sequence(:course) { |n| "Course_#{n}" }
    size { 3 }
    time_preferences { { 'Monday' => 'Morning', 'Tuesday' => 'Afternoon' } }
  end
end
