import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewArray, fetchReviews } from '../../store/review';
import { useParams } from 'react-router-dom';
import ReviewIndexItem from './ReviewIndexItem.jsx';
import './ReviewIndex.css';

const ReviewsIndex = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  const reviews = useSelector(selectReviewArray);
  const reviewsList = reviews.map((review) => {
    return <ReviewIndexItem key={review.id} review={review} />;
  });

  return (
    <div className='display-review-container'>
      <p>There will be reviews under this</p>
      <ul>
        {reviewsList}
      </ul>
    </div>
  );

};

export default ReviewsIndex;

