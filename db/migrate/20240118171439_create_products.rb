class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false, index: {unique: true}
      t.string :description, null: false
      t.integer :price, null: false
      t.references :seller, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
