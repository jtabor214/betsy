class Api::CartsController < ApplicationController
    before_action :require_logged_in, only: [:index]

    def index 
        @carts = current_user.cart
        render :index
    end

    def create 
        @cart = Cart.new(cart_params)
        if @cart.save
            render :show 
        else 
            render json: @cart.errors.full_messages, status: :unprocessable_entity
        end
    end 

    def destroy 
        @cart = Cat.find_by(params[:id])
        if @cart
            @cart.delete 
            head :no_content 
        end
    end

    def update 
        @cart = Cart.find(params[:id])
        if @cart
            if @cart.update(cart_params)
                render :show
            else 
                render json: @cart.errors.full_messages, status: :unprocessable_entity
            end
        end
    end


    private 

    def cart_params
        params.require(:cart).permit(:id, :quantity, :user_id, :product_id)
    end
end
