import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductIndexItem from './ProductIndexItem';
import { selectProductsArray, fetchProducts } from '../../store/product';
import './ProductsIndex.css';

const ProductsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(selectProductsArray);
  // const products = [
  //   {
  //     id: 1,
  //     name: 'product',
  //     price: 4,
  //   },
  // ];

  const productsList = products.map((product) => {
    return <ProductIndexItem key={product.id} product={product} />;
  });

  return (
    <div id='display-product-container'>
      <h1>Shop Handmade Items</h1>
      <ul id="product-listings">
        {productsList}
      </ul>
    </div>
  );

};

export default ProductsIndex;