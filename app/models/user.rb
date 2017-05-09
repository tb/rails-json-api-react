class User < ActiveRecord::Base
  rolify
  has_and_belongs_to_many :roles, :join_table => :users_roles

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable
  include DeviseTokenAuth::Concerns::User

  scope :email_contains, -> (value) { where('email ILIKE ?', "%#{value.join}%") }

  def admin?
    has_role?(:admin)
  end

  def token_validation_response
    self.as_json(except: [
      :tokens, :created_at, :updated_at
    ]).merge("role" => self.roles.map(&:name).join)
  end
end
