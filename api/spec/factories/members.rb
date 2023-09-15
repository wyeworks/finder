FactoryBot.define do
  factory :member do
    association :user, factory: :user
    association :group, factory: :group
    role { 'admin' }
  end
end
