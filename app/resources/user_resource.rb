class UserResource < JSONAPI::Resource
  extend ModelFilter
  attributes :email, :confirmed_at, :created_at, :roles

  paginator :paged
  model_filters :email_contains

  def roles
    @model.roles.pluck(:name)
  end

  def roles=(roles)
    @model.roles.destroy_all
    roles.map do |role|
      @model.add_role role
    end
  end
end
