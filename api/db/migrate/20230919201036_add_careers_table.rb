class AddCareersTable < ActiveRecord::Migration[7.0]
  def change
    create_table :careers, if_not_exists: true do |t|
      t.string :name, null: false
      t.string :code, null: false
      t.string :approved_on
      t.integer :years
      t.integer :credits

      t.timestamps
    end

    add_index :careers, :code, unique: true
  end
end
