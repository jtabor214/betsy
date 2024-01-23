import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewArray, fetchReviews } from '../../store/review';
import ReviewIndexItem from './ReviewIndexItem';
import './ReviewIndex.css';

const ReviewsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const reviews = useSelector(selectReviewArray);
  const reviewsList = reviews.map((review) => {
    return <ReviewIndexItem key={review.id} review={review} />;
  });

  return (
    <div className='display-review-container'>
      <ul>
        {reviewsList}
      </ul>
    </div>
  );

};

export default ReviewsIndex;

