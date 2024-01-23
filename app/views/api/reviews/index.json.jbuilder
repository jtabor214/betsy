@reviews.each do |review|
  json.set! review.id do 
    json.extract! review, :id, :rating, :body, :product_id, :user_id #profil_pic
    # json.photoUrl product.photos.attached? ? product.photos[0].url : nil
  end
end