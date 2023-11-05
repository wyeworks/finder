class RemoveHourFromMessages < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :hour, :datetime, if_exists: true
  end
end
