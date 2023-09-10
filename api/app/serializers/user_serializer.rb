class UserSerializer
  include JSONAPI::Serializer

  attributes :id,
             :email,
             :name,
             :birth_date,
             :bio,
             :social_networks
end
