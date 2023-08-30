class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :bio, :string
    add_column :users, :profile_pic, :string
    add_column :users, :time_slots, :json
  end
end
