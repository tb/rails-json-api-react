class UserResource < JSONAPI::Resource
  extend ModelFilter
  attributes :email, :confirmed_at, :created_at
  attribute :role

  has_many :roles

  paginator :paged
  model_filters :email_contains

  def role
    self._model.roles.map(&:name).join
  end
end
