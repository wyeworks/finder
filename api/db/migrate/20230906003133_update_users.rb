class UpdateUsers < ActiveRecord::Migration[6.0]
  def up
    change_table :users, bulk: true do |t|
      t.change :birth_date, :datetime, null: true
      t.text :bio
    end
  end

  def down
    change_table :users, bulk: true do |t|
      t.change :birth_date, :datetime, null: false
      t.remove :bio
    end
  end
end
