# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
require "open-uri"
# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Product.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('products')

  puts "Creating users..."
  # Create one user with an easy to remember name, email, and password:
  User.create!(
    name: 'Demo', 
    email: 'demo@user.io', 
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
    io: URI.open("https://betsy1-seeds.s3.amazonaws.com/brawl.png"),
     filename: "brawl.png"
     )

  10.times do 
    Product.create!({
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      price: Faker::Commerce.price(range: 7..350)
    })
  end

  puts "Done!"
# end



# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
