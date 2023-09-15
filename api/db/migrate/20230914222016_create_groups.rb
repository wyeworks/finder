class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.text :description, default: ''
      t.string :course, null: false
      t.integer :size
      t.string :days
      t.string :time_preference

      t.timestamps
    end
  end
end
