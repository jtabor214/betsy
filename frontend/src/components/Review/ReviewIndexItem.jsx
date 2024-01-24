import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/review";

const ReviewIndexItem = ({review}) => {
  const dispatch = useDispatch();

  return (
    <div className='reviews-card-container'>

      <p>{review.rating}</p>
      <p>{review.body}</p>
      <button onClick={() => dispatch(deleteReview(review.id))}>Remove Review</button>
    </div>
  );
};


export default ReviewIndexItem;