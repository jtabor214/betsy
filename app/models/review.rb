class Review < ApplicationRecord

  validates :rating, :body, :product_id, :user_id, presence: true
  validates :rating, numericality: { greater_than_or_equal_to: 0, less_than: 6 }

  belongs_to :product
  belongs_to :user

end
