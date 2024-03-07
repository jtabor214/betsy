class Cart < ApplicationRecord
    validates :quantity, presence: true
    validates :user, presence: true 
    validates :product, presence: true 

    belongs_to :product
    belongs_to :user

end
