class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers, force: true do |t|
      t.string  :company_name
      t.string  :contact_name
      t.string  :contact_title
      t.string  :address
      t.string  :city
      t.string  :region
      t.string  :postal_code
      t.string  :country
      t.string  :phone
      t.string  :fax
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
