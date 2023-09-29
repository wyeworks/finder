class SubjectSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :code,
             :credits,
             :group_ids,
             :user_ids
end
