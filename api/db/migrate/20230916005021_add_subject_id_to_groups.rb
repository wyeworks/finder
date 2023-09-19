class AddSubjectIdToGroups < ActiveRecord::Migration[7.0]
  def up
    add_reference :groups, :subject, index: false, type: :integer, if_not_exists: true
    add_index :groups, :subject_id, if_not_exists: true
    add_foreign_key :groups, :subjects unless foreign_key_exists?(:groups, :subjects)
  end

  def down
    remove_foreign_key :groups, :subjects if foreign_key_exists?(:groups, :subjects)
    remove_index :groups, :subject_id, if_exists: true
    remove_reference :groups, :subject, index: false, type: :integer, if_exists: true
  end
end
