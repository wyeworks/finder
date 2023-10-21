class ChangeMeetingLinkInSessions < ActiveRecord::Migration[7.0]
  def change
    change_column_null :sessions, :meeting_link, true
  end
end
