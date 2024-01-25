class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]

  def index 
    # debugger
    product = Product.find(params[:product_id])
    @reviews = product.reviews
    render :index 
  end

  def create 
    product = Product.find(params[:product_id])
    product_id = product.id 

    @review = Review.new(review_params)
    @review.product_id = product_id 
    @review.user_id = current_user.id

    if @review.save!
      render :show 
    else 
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def update 
    @review = Review.find_by(id: params[:id])

    if @review.user_id == current_user.id 
      if @review.update(review_params)
        render :show 
      else 
        render json: { errors: @product.errors.full_messages }, status: 422
      end
    end
  end

  def destroy 
    @review = Review.find_by(id: params[:id])
    # if @review.user_id == current_user.id 
      if @review&.destroy 
        render :show 
      else 
        render json: { errors: @product.errors.full_messages }, status: 422
      end
    # end
  end

  private 

  def review_params 
    params.require(:review).permit(:rating, :body, :id)
  end

end
