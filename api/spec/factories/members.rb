FactoryBot.define do
  factory :member do
    user
    group
    role { 'admin' }
  end
end
