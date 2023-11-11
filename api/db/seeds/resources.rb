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
# TODO: Create groups

# Sessions
# TODO: Create sessions
