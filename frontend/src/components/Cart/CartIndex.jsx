import { useDispatch, useSelector } from 'react-redux';
import './CartIndex.css'
import { useEffect } from 'react';
import {selectProductsArray} from '../../store/product'
import { fetchCart, memoizedCartItems } from '../../store/cart';


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
    // let amount = 25
    cartItems.forEach(item => {
        products.forEach(product => {
            if (item.productId === product.id) {
                quantity += item.quantity;
                total += Math.round(item.quantity * product.price);
                // amount -= item.quantity * product.price;
            }
        });
    });

    return (
        <div className='cart-container'>
            <p>cart page</p>
        </div>
    );

};

export default CartIndex;