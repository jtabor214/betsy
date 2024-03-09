@carts.each do |cart|
    json.set! cart.id do 
        json.extract! cart, :id, :quantity, :product_id, :user_id
    end
end