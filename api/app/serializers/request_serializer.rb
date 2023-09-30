class RequestSerializer
  include JSONAPI::Serializer

  attributes :id,
             :status
end
