class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable
  include DeviseTokenAuth::Concerns::User

  scope :email_contains, -> (value) { where('email ILIKE ?', "%#{value.join}%") }
end
