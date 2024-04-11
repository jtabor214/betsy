class Product < ApplicationRecord

  validates :name, :description, presence: true, uniqueness: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  # validates :seller_id, presence: true


  has_many_attached :photos
  has_many :reviews
  has_many :carts
  # belongs_to :seller, class_name: 'user', foreign_key: 'seller_id'
end
