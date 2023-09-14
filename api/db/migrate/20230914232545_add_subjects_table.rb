class AddSubjectsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects, if_not_exists: true do |t|
      t.string :name
      t.string :code
      t.integer :credits

      t.timestamps
    end

    add_index :subjects, :code, unique: true
  end
end
