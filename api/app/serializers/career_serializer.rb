class CareerSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :code,
             :approved_on,
             :years,
             :credits,
             :user_ids
end
