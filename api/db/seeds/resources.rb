# frozen_string_literal: true

# Users
user_one = User.create!(
  name: 'User One',
  email: 'user.one@email.com',
  password: 'Test#123',
  confirmed_at: DateTime.now,
  birth_date: DateTime.parse('2000-01-01'),
  bio: 'This is User One\'s bio',
  social_networks: {
    facebook: 'foo',
    instagram: 'bar'
  },
  career_ids: [1],
  subject_ids: [1, 2, 3]
)

user_two = User.create!(
  name: 'User Two',
  email: 'user.two@email.com',
  password: 'Test#123',
  confirmed_at: DateTime.now,
  birth_date: DateTime.parse('2000-01-01'),
  bio: 'This is User Two\'s bio',
  social_networks: {
    facebook: 'foo',
    instagram: 'bar'
  },
  career_ids: [2],
  subject_ids: [1, 2, 3]
)

user_three = User.create!(
  name: 'User Three',
  email: 'user.three@email.com',
  password: 'Test#123',
  confirmed_at: DateTime.now,
  birth_date: DateTime.parse('2000-01-01'),
  bio: 'This is User Three\'s bio',
  social_networks: {
    facebook: 'foo',
    instagram: 'bar'
  },
  career_ids: [3],
  subject_ids: [1, 2, 3]
)

# Groups
group_one = Group.create!(
  name: 'Group One',
  description: 'This is Group One\'s description',
  size: 10,
  time_preferences: {
    'Friday' => 'None',
    'Sunday' => 'Morning'
  },
  subject_id: 1
)

creator_member_one = group_one.members.create!(
  user: user_one,
  role: 'admin'
)

group_one.members.create!(
  user: user_three,
  role: 'participant'
)

group_two = Group.create!(
  name: 'Group Two',
  description: 'This is Group Two\'s description',
  size: 8,
  time_preferences: {
    'Monday' => 'Morning',
    'Wednesday' => 'Night'
  },
  subject_id: 2
)

creator_member_two = group_two.members.create!(
  user: user_two,
  role: 'admin'
)

group_two.members.create!(
  user: user_three,
  role: 'participant'
)

# Sessions
Session.create!(
  name: 'Session One',
  description: 'This is Session One\'s description',
  location: 'Location One',
  meeting_link: 'https://meet.example.com/session1',
  start_time: DateTime.now + 1.day,
  end_time: DateTime.now + 1.day + 2.hours,
  group_id: group_one.id,
  creator: creator_member_one
)

Session.create!(
  name: 'Session Two',
  description: 'This is Session Two\'s description',
  location: 'Location Two',
  meeting_link: 'https://meet.example.com/session2',
  start_time: DateTime.now + 2.days,
  end_time: DateTime.now + 2.days + 2.5.hours,
  group_id: group_two.id,
  creator: creator_member_two
)
