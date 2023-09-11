class UserSerializer
  include JSONAPI::Serializer

  attribute :birth_date do |object|
    object.birth_date&.strftime('%Y-%m-%d')
  end

  attributes :id,
             :email,
             :name,
             :bio,
             :social_networks
end
