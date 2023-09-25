class GroupSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :size,
             :time_preferences,
             :subject_id,
             :user_ids

  belongs_to :subject
end
