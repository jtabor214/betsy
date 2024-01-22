import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchProduct, selectProduct } from '../../store/product';
import './ProductIndexItem.css';
import { useEffect } from 'react';

const ProductIndexItem = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = selectProduct(productId);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);


  return (
    <div className='product-card-container'>
      <div className='product-content'>
        <Link to={`products/${product.id}`}>This is an item</Link>
        <h4>{product.name}</h4>
        <p>${product.price}</p>
        {/* <Link to={`/products/${product.id}`}>This is one item</Link> */}
      </div>
    </div>
  );
};

export default ProductIndexItem;

{/* <image src={product.photoUrl}></image>; */}