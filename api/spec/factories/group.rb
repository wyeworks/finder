FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Name_#{n}" }
    description { 'Description' }
    size { 3 }
    time_preferences { { 'Monday' => 'Morning', 'Tuesday' => 'Afternoon' } }
    subject

    trait :with_members do
      after(:create) do |group|
        create_list(:member, 2, group:, role: 'participant')
      end
    end

    trait :with_sessions do
      with_members
      after(:create) do |group|
        create_list(:session, 3, group:)
      end
    end
  end
end
