import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductIndexItem from './ProductIndexItem';
import { selectProductsArray, fetchProducts } from '../../store/product';

const ProductsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(selectProductsArray);
  const productsList = products.map((product) => {
    return <ProductIndexItem key={product.id} product={product} />;
  });

  return (
    <div id='display-product-container'>
      <p>Product&apos;s go inside this section here!</p>
      <ul>
        {productsList}
      </ul>
    </div>
  );

};

export default ProductsIndex;