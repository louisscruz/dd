module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
    p "logged in"
  end

  def current_user
    auth_token = request.headers["Authorization"]
    if auth_token.split(" ").length > 1
      auth_token = auth_token.split(" ")[1]
    end
    #@current_user ||= User.find_by(auth_token: request.headers["Authorization"])
    @current_user ||= User.find_by(auth_token: auth_token)

    p @current_user
  end

  def log_out(user)
    #p logged_in?
    logged_in? ? user.generate_authentication_token! : user.destroy_token!
    #user.generate_authentication_token!
    auth_token = user.auth_token
    user.update_attribute(:auth_token, auth_token)
  end

  def logged_in?
    current_user.present?
  end

  def authenticate_with_token!
    render json: { errors: "Not authenticated" }, status: :unauthorized unless logged_in?
  end
end
