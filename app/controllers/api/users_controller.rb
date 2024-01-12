class Api::UsersController < ApplicationController
  wrap_parameters include: CreateUser.attribute_names + ['password']

  def create 
    @user = CreateUser.create(user_params)
    if @user.save!
      login!(@user)
      render :show
    else  
      render :json { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end 
  end


  private 

  def user_params 
    params.require(:user).permit(:name, :password)
  end
end
