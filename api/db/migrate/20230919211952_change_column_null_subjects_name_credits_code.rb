class ChangeColumnNullSubjectsNameCreditsCode < ActiveRecord::Migration[7.0]
  def change
    change_column_null :subjects, :name, false
    change_column_null :subjects, :credits, false
    change_column_null :subjects, :code, false
  end
end
