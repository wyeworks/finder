class CreateJoinTableCareerUser < ActiveRecord::Migration[7.0]
  def change
    create_join_table :careers, :users, if_not_exists: true do |t|
      t.index :career_id
      t.index :user_id
      t.index %i[career_id user_id], unique: true

      t.timestamps
    end
  end
end
