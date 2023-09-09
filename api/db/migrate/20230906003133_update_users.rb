class UpdateUsers < ActiveRecord::Migration[6.0]
  def up
    change_table :users, bulk: true do |t|
      t.change :birth_date, :date, null: true
      t.text :bio
      t.string :avatar
    end
  end

  def down
    change_table :users, bulk: true do |t|
      t.change :birth_date, :date, null: false
      t.remove :bio
      t.remove :avatar
    end
  end
end
