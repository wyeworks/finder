FactoryBot.define do
  factory :subject do
    sequence(:name) { |n| "Subject_#{n}" }
    sequence(:code, &:to_s)
    credits { 10 }

    careers { build_list :career, 1, subjects: [] }
  end
end
