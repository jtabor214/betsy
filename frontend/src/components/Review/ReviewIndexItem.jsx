import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/review";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { selectProduct, fetchProduct } from "../../store/product";
import ReviewForm from "./ReviewForm";
import StarRatings from 'react-star-ratings';
import "./ReviewIndexItem.css";


const ReviewIndexItem = ({review}) => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectProduct(productId));
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);


  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review?.rating || 1);
  // const [totalRating, setTotalRating] = useState(0)
  // const [totalReviews, setTotalReviews] = useState(0)

  // useEffect (() => {
  //   if (review) {
  //     setTotalRating(prevTotalRating => prevTotalRating + review.rating);
  //     setTotalReviews(prevTotalReviews => prevTotalReviews + 1);
  //   }
  // }, [review])

  return (
    <div className='reviews-card-container'>
      { isEditing ? <ReviewForm review={review} setIsEditing={setIsEditing} /> : 
        <div className="review-card">
          {currentUser?.id === review.userId ? <button id="edit-button" onClick={() => setIsEditing(true)}>Edit</button> : null }
          <label htmlFor="" id="stars">
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
          <p id="review-body">{review.body}</p>
          <p id="product-name">Purchased Item: {product?.name} </p>
          <p id="username">username</p> 
          {currentUser?.id === review.userId ? 
          <button onClick={() => dispatch(deleteReview(review.productId, review.id))}>Remove Review</button> 
          : null }
        </div>
      }
    </div>
  );
};


export default ReviewIndexItem;