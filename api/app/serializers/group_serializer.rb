class GroupSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :size,
             :time_preferences,
             :subject_id

  belongs_to :subject
end
