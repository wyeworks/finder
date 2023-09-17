class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups, if_not_exists: true do |t|
      t.string :name, null: false
      t.text :description, default: ''
      t.string :course, null: false
      t.integer :size, null: false
      t.jsonb :time_preferences, default: {}

      t.timestamps
    end
    add_index :groups, :name, unique: true
  end
end
