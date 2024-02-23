import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewArray, fetchReviews } from '../../store/review';
import { useParams } from 'react-router-dom';
import ReviewIndexItem from './ReviewIndexItem.jsx';
import ReviewForm from './ReviewForm.jsx';
import './ReviewIndex.css';

const ReviewsIndex = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

 
  const reviews = useSelector(selectReviewArray);
  const reviewCount = reviews.length;
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const average = totalRating / reviewCount;
    setAverageRating(average || 0)
  }, [reviews, reviewCount])
  
  return (
    <div className='display-review-container'>
      <p> {reviewCount} reviews {averageRating.toFixed(1)}</p>
      <div className='review-selections'>
        <button id="item-reviews">Reviews for this item {reviewCount}</button>
        <button id="shop-reviews">Reviews for this shop 0</button>
      </div>
      <div >
        {reviews.reverse().filter(review => review.productId == productId).map((review) => (
          <ReviewIndexItem key={review.id} review={review} />
        ))}
      </div>
      <div className='create-review-input'>
        {currentUser ? (
          <>
            <p>Create a review</p>
            <ReviewForm />
          </>
        ) : (
          <p>Sign in to post a review</p>
        )}
      </div>
    </div>
  );

};

export default ReviewsIndex;

