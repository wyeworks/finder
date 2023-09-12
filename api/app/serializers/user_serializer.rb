class UserSerializer
  include JSONAPI::Serializer

  attributes :id,
             :email,
             :name,
             :bio,
             :birth_date,
             :social_networks
end
