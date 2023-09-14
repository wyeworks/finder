class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :name
      t.text :description
      t.string :course
      t.integer :size
      t.string :days
      t.string :time_preference

      t.timestamps
    end
  end
end
