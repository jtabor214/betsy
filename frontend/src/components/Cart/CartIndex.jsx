import { useDispatch, useSelector } from 'react-redux';
import './CartIndex.css'
import { useEffect } from 'react';
import {selectProductsArray} from '../../store/product'
import { fetchCart, memoizedCartItems } from '../../store/cart';
import { NavLink } from 'react-router-dom';


const CartIndex = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(memoizedCartItems);
    const products = useSelector(selectProductsArray);
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch, sessionUser])


    let total = 0.00
    let quantity = 0
    cartItems.forEach(item => {
        products.forEach(product => {
            if (item.productId === product.id) {
                quantity += item.quantity;
                total += Math.round(item.quantity * product.price);
            }
        });
    });

    return (
        <div className='cart-page-container'>
            {cartItems.length === 0 ? (
              <div className='empty-cart-container'>
                <h1> Your cart is empty.</h1>
                <NavLink id='root-btn' to="/">Discover something unique to fill it up</NavLink>
              </div>
              ) : (
              <ul id='cart-listings'>
                {cartItems.map((cartItem, index) => (
                  <li id='product-cards' key={`${cartItem.id}_${index}`}>
                    <CartIndexItem cartItem={cartItem}/>
                  </li>
                ))}
              </ul>
            )} 
        </div>
    );

};

export default CartIndex;