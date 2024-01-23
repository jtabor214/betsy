import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/product";
import placeholder from '../../../public/assets/images/placeholder.svg';
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
      <img src={placeholder} alt="" />
      <p>{product?.name}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <p><ReviewsIndex /></p>
    </>
  );


};

export default ProductShow;