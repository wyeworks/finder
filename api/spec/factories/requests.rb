FactoryBot.define do
  factory :request do
    status { 'pending' }
    reason { 'Reason' }
    user
    group

    trait :with_rejected_status do
      status { 'rejected' }
    end
  end
end
