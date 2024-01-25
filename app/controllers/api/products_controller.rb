class Api::ProductsController < ApplicationController
  before_action :require_login, only: [:create, :edit, :update, :destroy]

  def index 
    if params[:query]
      @products = 
      Product.where("name ILIKE '%#{params[:query]}%'")
    else
      @products = Product.all
    end

    render :index 
  end

  def show 
    @product = Product.find(params[:id])
    render :show
  end 

  def create 
    @product = Product.new(product_params)
    if @product.save!
      render :show 
    else 
      render json: { errors: @product.errors.full_messages }, status: 422
    end
  end

  def edit 
    @product = Product.find(params[:id])
    render :edit
  end

  def update
    @product = Product.find_by(id: params[:id])
    if @product.user_id == current_user.id 
      if @poem.update(poem_params)
        render :show 
      else  
        render json: { errors: @product.errors.full_messages }, status: 422
      end 
    end
  end

  def destroy 
    @product = current_user.products.find_by(id: params[:id])
    if @product&.destroy
      render :show 
    else  
      render json: { errors: @product.errors.full_messages }, status: 422
    end
  end


  private 

  def product_params 
    params.require(:product).permit(:name, :description, :price, :seller_id)
  end


end
