FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Name_#{n}" }
    sequence(:email) { |n| "email_#{n}@fing.edu.uy" }
    password { 'Test#123' }
    confirmed_at { DateTime.now }
    birth_date { Date.parse('2023-01-01') }

    trait :with_confirmation_token do
      confirmed_at { nil }
      confirmation_token { 'some_token' }
    end
  end
end
