FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Name_#{n}" }
    sequence(:email) { |n| "email_#{n}@fing.edu.uy" }
    password { 'Test#123' }
    confirmed_at { DateTime.now }
    birth_date { DateTime.parse('2023-01-01') }

    careers { build_list :career, 1, users: [] }

    trait :with_confirmation_token do
      confirmed_at { nil }
      confirmation_token { 'some_token' }
    end

    trait :with_social_networks do
      social_networks do
        {
          facebook: 'foo',
          instagram: 'bar'
        }
      end
    end
  end
end
