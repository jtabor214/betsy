# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
require "open-uri"
# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Review.destroy_all
  Product.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('products')
  ApplicationRecord.connection.reset_pk_sequence!('reviews')

  puts "Creating users..."
  # Create one user with an easy to remember name, email, and password:
  User.create!(
    name: 'Demo', 
    email: 'demo@email.com', 
    password: 'password'
  )
  # More users
  10.times do 
    User.create!({
      name: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Creating products..."

  newProduct = Product.create!(
    name: 'Product',
    description: 'This is a great product!',
    price: 14 
  )
  newProduct.photos.attach(
    io: URI.open("https://picsum.photos/256"),
     filename: "brawl.png"
     )

  14.times do 
    product = Product.create!({
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      price: Faker::Commerce.price(range: 7..350)
    })
    pic = URI.open("https://picsum.photos/256")
    product.photos.attach(io: pic, filename: "product#{product.id}_thumbnail.jpg")
  end

  puts "Printing reviews..."

  Review.create!(
    rating: 4,
    body: 'I loved everything about this product',
    product_id: 1,
    user_id: 1
  )

  11.times do |num|
    Review.create!({
      user_id: (num + 1),
      product_id: (num + 1),
      body: Faker::Lorem.sentence,
      rating: [1, 2, 3, 4, 5].sample
  })
  end

  puts "Done!"
# end



# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
