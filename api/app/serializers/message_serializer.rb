class MessageSerializer
  include JSONAPI::Serializer

  attributes :id, :content, :hour, :user_id, :group_id

  belongs_to :user
  belongs_to :group
end
