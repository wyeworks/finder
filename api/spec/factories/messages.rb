FactoryBot.define do
  factory :message do
    content { 'MyText' }
    user
    group
  end
end
