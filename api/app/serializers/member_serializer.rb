class MemberSerializer
  include JSONAPI::Serializer

  attribute :member_id, &:id

  attribute :user_id do |member|
    member.user.id
  end

  attribute :email do |member|
    member.user.email
  end

  attribute :name do |member|
    member.user.name
  end

  attribute :role
end
