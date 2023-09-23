class RemoveUniqueIndexFromGroups < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      dir.up do
        remove_index :groups, name: 'index_groups_on_name'
      end
      dir.down do
        add_index :groups, :name, unique: true, name: 'index_groups_on_name'
      end
    end
    add_index :groups, :name
  end
end
