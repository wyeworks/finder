FactoryBot.define do
  factory :session do
    sequence(:name) { |n| "Session_#{n}" }
    start_time { 1.day.from_now }
    end_time { 1.day.from_now + 2.hours }
    description { 'Description' }
    location { 'Location' }
    meeting_link { 'https://zoom.us/meeting_link' }
    group { create(:group, :with_members) }
    creator { group.members.first }

    trait :with_attendances do
      after(:create) do |session|
        session.group.members.each do |member|
          create(:attendance, member:, session:, status: 'pending')
        end
      end
    end
  end
end
