class AddUserIdGroupIdIndexToMembers < ActiveRecord::Migration[7.0]
  def change
    add_index :members, %i[user_id group_id], unique: true
  end
end
