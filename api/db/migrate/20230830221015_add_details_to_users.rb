class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.string :bio
      t.string :profile_pic
      t.json :time_slots
    end
  end
end
