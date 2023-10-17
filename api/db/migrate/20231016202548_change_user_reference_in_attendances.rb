class ChangeUserReferenceInAttendances < ActiveRecord::Migration[7.0]
  def change
    remove_reference :attendances, :user, index: true, foreign_key: true
    add_reference :attendances, :member, index: true, foreign_key: true
  end
end
