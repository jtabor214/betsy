import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/review";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import StarRatings from 'react-star-ratings';
import "./ReviewIndexItem.css";


const ReviewIndexItem = ({review}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => {
    return state.session.user;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review?.rating || 1);

  return (
    <div className='reviews-card-container'>
      { isEditing ? <ReviewForm review={review} setIsEditing={setIsEditing} /> : 
        <div className="review-card">
          {currentUser?.id === review.userId ? <button id="edit-button" onClick={() => setIsEditing(true)}>Edit</button> : null }
          <p>{review.userId}</p>
          <label htmlFor="">Rating
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
          <p>{review.body}</p>
          {currentUser?.id === review.userId ? <button onClick={() => dispatch(deleteReview(review.productId, review.id))}>Remove Review</button> : null }
        </div>
      }
    </div>
  );
};


export default ReviewIndexItem;