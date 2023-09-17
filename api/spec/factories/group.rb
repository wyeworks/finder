FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Name_#{n}" }
    description { 'Description' }
    size { 3 }
    time_preferences { { 'Monday' => 'Morning', 'Tuesday' => 'Afternoon' } }
    subject
  end
end
