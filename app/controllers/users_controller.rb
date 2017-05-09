class UsersController < AuthorizedController
  load_and_authorize_resource
end
