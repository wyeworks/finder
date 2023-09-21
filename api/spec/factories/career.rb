FactoryBot.define do
  factory :career do
    sequence(:name) { |n| "Career_#{n}" }
    sequence(:code, &:to_s)
    years { 5 }
    credits { 450 }
  end
end
