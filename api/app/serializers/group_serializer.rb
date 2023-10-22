class GroupSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :size,
             :time_preferences,
             :subject_id,
             :subject_name,
             :user_ids

  belongs_to :subject

  attribute :subject_name do |group|
    group.subject.name
  end

  attribute :requests do |group, params|
    if group.admin?(params[:current_user])
      group.requests.map do |request|
        {
          id: request.id,
          status: request.status,
          reason: request.reason,
          group_id: request.group_id,
          user_id: request.user_id,
          user_name: request.user.name,
          user_email: request.user.email
        }
      end
    else
      []  # Return an empty array if the user isn't an admin.
    end
  end
end
