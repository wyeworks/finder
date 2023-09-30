class RequestSerializer
  include JSONAPI::Serializer

  attributes :id,
             :status,
             :reason,
             :group_id,
             :user_id
end
