import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/product";
import ReviewsIndex from "../Review/ReviewIndex";




const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectProduct(productId));

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  console.log(productId);
  console.log(product?.description);
  // debugger
  return (
    <>
      <img src={product?.photoUrl} alt="random image" />
      <p>{product?.name}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <p><ReviewsIndex /></p>
    </>
  );


};

export default ProductShow;