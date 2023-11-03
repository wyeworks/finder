FactoryBot.define do
  factory :message do
    content { 'MyText' }
    hour { '2023-10-30 21:56:25' }
    user
    group
  end
end
