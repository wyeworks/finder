class AttendanceSerializer
  include JSONAPI::Serializer

  attributes :id,
             :status,
             :session_id,
             :member_id
end
