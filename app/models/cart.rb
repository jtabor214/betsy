class Cart < ApplicationRecord
    validates :quantity, presence: true


    belongs_to :product
    belongs_to :user

end
