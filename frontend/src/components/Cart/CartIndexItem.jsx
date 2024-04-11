import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectProduct } from "../../store/product";
import { deleteCartItem, updateCartItem } from "../../store/cart";
import './CartIndexItem.css'



const CartIndexItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const product = useSelector(selectProduct(cartItem.product_id));
  if (!product) return null;
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleQuantityChange = (e) => {
    const updateQuantity = parseInt(e.currentTarget.value);
    const updateCart = {id: cartItem.id, 
      quantity: updateQuantity, 
      user_id: currentUser.id, 
      product_id: product.id,};
    setQuantity(updateQuantity);
    dispatch(updateCartItem(updateCart, currentUser.id))
  }

   
  return (
    <div className="cart-item-container">
      <div className="cart-card" key={cartItem.id}>
        <div id='product-img'>
          <NavLink to={`/products/${product.id}`}>
              <img src={product?.photoUrl} alt={product.name} />
          </NavLink>
        </div>
        <div id='cart-card-info'>
          <NavLink to={`/products/${product.id}`} id='prod-name'> {product.name} </NavLink>
        </div>
        <select 
          value={quantity} 
          id="quantity-selector"
          onChange={handleQuantityChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <button id='remove-item-btn' onClick={() => dispatch(deleteCartItem(cartItem.id))}>Remove</button>
      </div>
    </div>
  )

}

export default CartIndexItem;