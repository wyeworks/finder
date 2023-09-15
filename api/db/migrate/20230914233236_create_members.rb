class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members, if_not_exists: true do |t|
      t.references :user, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true
      t.string :role, null: false

      t.timestamps
    end
  end
end
