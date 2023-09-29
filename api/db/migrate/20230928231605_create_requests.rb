class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests, if_not_exists: true do |t|
      t.integer :status
      t.string :reason
      t.references :user, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
