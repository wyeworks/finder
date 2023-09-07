class UpdateUsers < ActiveRecord::Migration[6.0]
  def change
    change_column_null :users, :birth_date, true
    add_column :users, :bio, :text
    add_column :users, :avatar, :string
  end
end
