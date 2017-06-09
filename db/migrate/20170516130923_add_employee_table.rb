class AddEmployeeTable < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.string   :last_name
      t.string   :first_name
      t.string   :title
      t.string   :title_of_courtesy
      t.date     :birth_date
      t.date     :hire_date
      t.string   :address
      t.string   :city
      t.string   :region
      t.string   :postal_code
      t.string   :country
      t.string   :home_phone
      t.string   :extension
      t.string   :photo
      t.text     :notes
      t.integer  :reports_to
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
