class AddDefaultStatusToRequests < ActiveRecord::Migration[7.0]
  def change
    change_column_default :requests, :status, from: nil, to: 0
  end
end
