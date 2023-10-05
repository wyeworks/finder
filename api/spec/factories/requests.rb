FactoryBot.define do
  factory :request do
    status { 'pending' }
    reason { nil }
    user
    group

    trait :with_rejected_status do
      status { 'rejected' }
    end

    trait :with_reason do
      reason { 'reason' }
    end
  end
end
