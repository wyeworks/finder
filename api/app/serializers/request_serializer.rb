class RequestSerializer
  include JSONAPI::Serializer

  attributes :id,
             :status,
             :reason,
             :group_id,
             :user_id,
             :user_name,
             :user_email

  attribute :user_name do |group|
    group.user.name
  end
  attribute :user_email do |group|
    group.user.email
  end
end
