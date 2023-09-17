FactoryBot.define do
  factory :member do
    role { 'admin' }
    user
    group
  end
end
