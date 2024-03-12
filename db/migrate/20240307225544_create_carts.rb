class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    drop_table :carts
    create_table :carts do |t|
      t.integer :quantity, null: false
      t.references :product, null: false, foreign_key: true 
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
    add_index :carts, [:user_id, :product_id], unique: true
  end
end
