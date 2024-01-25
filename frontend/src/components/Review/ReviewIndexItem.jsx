import { useDispatch, useSelector } from "react-redux";
import { deleteReview, updateReview } from "../../store/review";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewIndexItem = ({review}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => {
    return state.session.user;
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='reviews-card-container'>
      { isEditing ? <ReviewForm review={review} setIsEditing={setIsEditing} /> : 
        <>
          {currentUser?.id === review.userId ? <button onClick={() => setIsEditing(true)}>Edit</button> : null }
          <p>{review.userId}</p>
          <p>{review.rating}</p>
          <p>{review.body}</p>
          {currentUser?.id === review.userId ? <button onClick={() => dispatch(deleteReview(review.productId, review.id))}>Remove Review</button> : null }
        </>
      }
    </div>
  );
};


export default ReviewIndexItem;