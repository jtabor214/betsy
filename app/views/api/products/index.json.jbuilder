
  @products.each do |product|
    json.set! product.id do 
      json.extract! product, :id, :name, :price 
      json.photoUrl product.photos.attached? ? product.photos[0].url : nil
    end
  end
