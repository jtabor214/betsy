class Product < ApplicationRecord

  validates :name, :description, presence: true, uniqueness: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :seller_id, presence: true

  belongs_to :seller
end
