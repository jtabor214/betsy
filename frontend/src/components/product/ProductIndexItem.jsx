import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchProduct, selectProduct } from '../../store/product';
import './ProductIndexItem.css';
import { useEffect } from 'react';
import placeholder from '../../../public/assets/images/placeholder.svg';

const ProductIndexItem = ({product}) => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchProduct(product.id));
  }, [dispatch, product.id]);


  return (
    <div className='product-cards-container'>
      <Link to={`products/${product?.id}`} className='product-content'>
        <img id='product-img' src={placeholder} alt="image unavailable" />
        <h4>{product?.name}</h4>
        <p>${product?.price}</p>
      </Link>
    </div>
  );
};

export default ProductIndexItem;

{/* <image src={product.photoUrl}></image>; */}