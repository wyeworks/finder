class AddDefaultStatusToRequests < ActiveRecord::Migration[7.0]
  def change
    Request.where(status: nil).find_each do |request|
      request.update(status: 0)
    end

    change_column_default :requests, :status, from: nil, to: 0

    change_column_null :requests, :status, false
  end
end
