class Customer < ApplicationRecord
  scope :company_name_contains, -> (value) { where('company_name ILIKE ?', "%#{value.join}%") }
end
