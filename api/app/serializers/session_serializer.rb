class SessionSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :location,
             :meeting_link,
             :start_time,
             :end_time,
             :group_id

  attribute :attendances do |session|
    session.attendances.map do |attendance|
      {
        id: attendance.id,
        session_id: attendance.session_id,
        status: attendance.status,
        created_at: attendance.created_at,
        updated_at: attendance.updated_at,
        member_id: attendance.member_id,
        member_name: attendance.member.user.name,
        user_id: attendance.member.user.id
      }
    end
  end
end
