class RemoveCourseFromGroups < ActiveRecord::Migration[7.0]
  def change
    remove_column :groups, :course, :string, null: false, if_exists: true
  end
end
