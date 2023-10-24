class AddCreatorToSessions < ActiveRecord::Migration[7.0]
  def change
    add_reference :sessions, :creator, references: :members, index: true
    add_foreign_key :sessions, :members, column: :creator_id
  end
end
