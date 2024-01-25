import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewArray, fetchReviews } from '../../store/review';
import { useParams } from 'react-router-dom';
import ReviewIndexItem from './ReviewIndexItem.jsx';
import ReviewForm from './ReviewForm.jsx';
import './ReviewIndex.css';

const ReviewsIndex = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  console.log(productId);
  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  const currentUser = useSelector(state => {
    return state.session.user;
  });

  const reviews = useSelector(selectReviewArray);
  // const reviewsList = {reviews.reverse().filter(data => data.product_id == productId).map((review) => (
  //     <ReviewIndexItem key={review?.id} review={review} />
  //   ))}
  
  return (
    <div className='display-review-container'>
      <p>There will be reviews under this</p>
      { currentUser ? <ReviewForm /> : null }
      <div>
        {reviews.reverse().filter(review => review.productId == productId).map((review) => (
          <ReviewIndexItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );

};

export default ReviewsIndex;

