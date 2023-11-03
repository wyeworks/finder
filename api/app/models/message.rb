class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, :hour, presence: true
end
