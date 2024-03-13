import { useDispatch } from 'react-redux';
import './CartIndex.css'
import { useEffect } from 'react';
import {selectProductsArray} from '../../store/product'


const CartIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch])

    const products = useSelector(selectProductsArray);

    const productsList = products.map((product) => {
        return <ProductIndexItem key={product.id} product={product} />;
    })

    return (
        <div className='cart-container'>
            
        </div>
    );

};

export default CartIndex;