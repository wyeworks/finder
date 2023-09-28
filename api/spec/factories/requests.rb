FactoryBot.define do
  factory :request do
    status { 1 }
    reason { 'Reason' }
    user
    group
  end
end
