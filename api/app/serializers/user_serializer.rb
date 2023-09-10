class UserSerializer
  include JSONAPI::Serializer

  attribute :birth_date do |object|
    object.birth_date&.strftime('%Y-%m-%d')
  
  attributes :id,
             :email,
             :name,
             :birth_date,
             :bio,
             :social_networks
  attributes :id, :email, :name, :bio

  end
end
