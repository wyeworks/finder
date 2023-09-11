class BackfillConfirmedAtColumnForUsers < ActiveRecord::Migration[7.0]
  def change
    User.update confirmed_at: DateTime.now
  end
end
