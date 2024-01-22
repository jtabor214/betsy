json.product do 
  json.extract! @product, :id, :name, :description, :price, :seller_id, :created_at, :updated_at
  json.photoUrl @product.photos.attached? ? @product.photos[0].url : nil
end