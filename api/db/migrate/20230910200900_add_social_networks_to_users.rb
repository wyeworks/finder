class AddSocialNetworksToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :social_networks, :json
  end
end
