class UserSerializer
  include JSONAPI::Serializer

  attributes :id,
             :email,
             :name,
             :social_networks
end
