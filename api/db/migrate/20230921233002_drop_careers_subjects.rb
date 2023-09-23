class DropCareersSubjects < ActiveRecord::Migration[7.0]
  def change
    drop_table :careers_subjects, if_exists: true do |t|
      t.index :career_id
      t.index :subject_id
      t.index %i[career_id subject_id], unique: true

      t.timestamps
    end
  end
end
