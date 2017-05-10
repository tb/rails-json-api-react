class User < ActiveRecord::Base
  rolify
  has_and_belongs_to_many :roles, :join_table => :users_roles

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable
  include DeviseTokenAuth::Concerns::User

  scope :email_contains, -> (value) { where('email ILIKE ?', "%#{value.join}%") }

  def token_validation_response
    self.as_json(except: [
      :tokens, :created_at, :updated_at
    ]).merge(roles: self.roles.map(&:name))
  end
end
