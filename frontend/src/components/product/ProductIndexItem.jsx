import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
// import { useParams } from 'react-router-dom';
import { fetchProduct} from '../../store/product';
import './ProductIndexItem.css';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

// import placeholder from '../../../public/assets/images/placeholder.svg';

const ProductIndexItem = ({product}) => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchProduct(product.id));
  }, [dispatch, product.id]);

  const [rating, setRating] = useState(product?.rating || 1);


  return (
    <div className='product-cards-container'>
      <Link to={`products/${product?.id}`} className='product-content'>
        <img id='product-img' src={product?.photoUrl} alt="random image" />
        <h4>{product?.name}</h4>
        <label htmlFor="">
          <StarRatings
            rating={rating}
            starRatedColor='#222222'
            starHoverColor='#222222'
            changeRating={setRating}
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="4px"
          />
        </label>
        <p>${product?.price}</p>
      </Link>
    </div>
  );
};

export default ProductIndexItem;

{/* <image src={product.photoUrl}></image>; */}