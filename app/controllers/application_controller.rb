class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  #
  rescue_from CanCan::AccessDenied do |exception|
    render json: { message: "You don't have permissions." }, status: :forbidden
  end
end
