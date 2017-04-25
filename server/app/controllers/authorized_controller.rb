class AuthorizedController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include JSONAPI::ActsAsResourceController
  before_action :authenticate_user!
end
