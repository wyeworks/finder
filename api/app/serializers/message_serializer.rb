class MessageSerializer
  include JSONAPI::Serializer

  attributes :id, :content, :created_at, :user_id, :group_id, :user_name

  belongs_to :user
  belongs_to :group

  attribute :user_name do |message|
    message.user.name
  end
end
