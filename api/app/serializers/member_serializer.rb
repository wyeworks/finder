class MemberSerializer
  include JSONAPI::Serializer

  attribute :id do |member|
    member.user.id
  end

  attribute :email do |member|
    member.user.email
  end

  attribute :name do |member|
    member.user.name
  end

  attribute :bio do |member|
    member.user.bio
  end

  attribute :role
end
