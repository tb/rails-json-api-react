class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.date     :order_date
      t.date     :required_date
      t.date     :shipped_date
      t.integer  :ship_via
      t.float    :freight
      t.string   :ship_name
      t.string   :ship_address
      t.string   :ship_city
      t.string   :ship_region
      t.string   :ship_postal_code
      t.string   :ship_country
      t.timestamps
    end
  end
end
