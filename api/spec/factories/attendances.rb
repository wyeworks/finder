FactoryBot.define do
  factory :attendance do
    user
    session
    status { 'pending' }
  end
end
