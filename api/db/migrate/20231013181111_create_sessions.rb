class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions, if_not_exists: true do |t|
      t.string :name, null: false
      t.text :description
      t.string :location
      t.string :meeting_link, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
