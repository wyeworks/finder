class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, :hour, presence: true

  scope :group_by_date, ->(group_id:) do
    order(:created_at).where(group_id:).group_by(&:date)
  end

  def date
    created_at.to_date
  end
end
