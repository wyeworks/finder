class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :name, :bio, :social_networks

  attribute :birth_date do |object|
    object.birth_date&.strftime('%Y-%m-%d')
  end

  attribute :groups do |user|
    user.groups.map do |group|
      {
        id: group.id,
        name: group.name
      }
    end
  end

  attribute :careers do |user|
    user.careers.map do |career|
      {
        id: career.id,
        code: career.code,
        name: career.name
      }
    end
  end

  attribute :subjects do |user|
    user.subjects.map do |subject|
      {
        id: subject.id,
        name: subject.name
      }
    end
  end
end
