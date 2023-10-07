class GroupSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :size,
             :time_preferences,
             :subject_id,
             :subject_name,
             :user_ids

  belongs_to :subject

  attribute :subject_name do |group|
    group.subject.name
  end
end
