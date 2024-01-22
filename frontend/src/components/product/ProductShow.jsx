import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/product";


const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = selectProduct(productId);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  return (
    <>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </>
  );


};

export default ProductShow;