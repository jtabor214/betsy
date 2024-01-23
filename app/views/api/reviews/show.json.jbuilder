json.review do
  json.extract! @review, :id, :rating, :body, :product_id, :user_id
end