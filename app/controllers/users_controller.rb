class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)',"%#{params[:keyword]}%" )
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    render :edit
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
