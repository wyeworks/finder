FactoryBot.define do
  factory :member do
    role { 'admin' }
    user
    group

    trait :participant do
      role { 'participant' }
    end
  end
end
