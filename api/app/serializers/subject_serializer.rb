class SubjectSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :code,
             :credits
end
