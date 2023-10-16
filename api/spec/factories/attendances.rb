FactoryBot.define do
  factory :attendance do
    member
    session
    status { 'pending' }
  end
end
