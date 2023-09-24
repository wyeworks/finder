class CreateJoinTableSubjectUser < ActiveRecord::Migration[7.0]
  def change
    create_join_table :subjects, :users, if_not_exists: true do |t|
      t.index :subject_id
      t.index :user_id
      t.index %i[subject_id user_id], unique: true

      t.timestamps
    end
  end
end
