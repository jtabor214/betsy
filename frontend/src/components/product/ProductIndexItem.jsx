import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchProduct, selectProduct } from '../../store/product';
import './ProductIndexItem.css';
import { useEffect } from 'react';

const ProductIndexItem = ({product}) => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchProduct(product.id));
  }, [dispatch, product.id]);


  return (
    <div className='product-cards-container'>
      <div className='product-content'>
        {/* <Link to={`products/${product?.id}`}><img src={product.photoUrl} alt="" /></Link> */}
        <h4>{product?.name}</h4>
        <p>${product?.price}</p>
        {/* <Link to={`/products/${product.id}`}>This is one item</Link> */}
      </div>
    </div>
  );
};

export default ProductIndexItem;

{/* <image src={product.photoUrl}></image>; */}