class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user.is_admin?
      can :manage, :all
    else
      can :manage, Post
      can :manage, Category
      can :manage, Comment
      can :update, User, id: user.id
    end
  end
end
