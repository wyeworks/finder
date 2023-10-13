class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions, if_not_exists: true do |t|
      t.string :name
      t.text :description
      t.string :location
      t.string :meeting_link
      t.datetime :start_time
      t.datetime :end_time
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
