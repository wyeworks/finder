class UserSerializer
  include JSONAPI::Serializer

  attributes :id,
             :email,
             :name,
             :birth_date,
             :social_networks
end
