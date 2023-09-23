class GroupSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :description, :subject_id, :size, :time_preferences

  belongs_to :subject
end
