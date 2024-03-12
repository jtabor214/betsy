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

};

export default CartIndex;