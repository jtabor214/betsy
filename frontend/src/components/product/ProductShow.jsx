import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/product";
import ReviewsIndex from "../Review/ReviewIndex";
import './ProductShow.css';

const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectProduct(productId));

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);


  return (
    <div className="product-page-body">
      <div className="product-page-container">
        <div className="product-visuals-container">
          <img id="product-image" src={product?.photoUrl} alt="random image" />
        </div>
        <div className="product-info-container">
          <p id="price">${product?.price}</p>
          {/* <p id="">{product?.name}</p> */}
          <p id="product-desc">{product?.description}</p>
        </div>
      </div>
      <div className="product-reviews-container">
        <p><ReviewsIndex /></p>
      </div>
    </div>
  );


};

export default ProductShow;