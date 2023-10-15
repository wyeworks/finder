class SessionSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :location,
             :meeting_link,
             :start_time,
             :end_time,
             :group_id,
             :attendances

end