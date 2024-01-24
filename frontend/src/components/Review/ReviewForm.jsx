import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectReview, fetchReviews, createReview, updateReview } from '../../store/review';
import StarRatings from 'react-star-ratings';

const ReviewForm = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const { productId } = useParams();
  debugger
  const review = selectReview(reviewId) || {rating: 0, body:''};

  useEffect(() => {
    dispatch(fetchReviews(reviewId));
  }, [dispatch, reviewId]);

  const [rating, setRating] = useState(review.rating);
  const [body, setBody] = useState(review.body);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ...review,
      rating,
      body,
    };

    if (reviewId) {
      dispatch(updateReview(newReview));
    } else {
      dispatch(createReview(newReview, productId));
    }

    dispatch(fetchReviews(reviewId));
  };

  return (
    <>
      {/* <h1>{reviewId ? 'Update Post' : 'Create Review'}</h1> */}
      <form onSubmit={handleSubmit} action="">
        <br />
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
          {/* <input type="number" name="numericInput" onChange={(e) => setRating(e.target.value)} /> */}
        </label>
        <br />
        <label htmlFor="body">Body
          <input type="textarea" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <br />
        <button type="submit">{reviewId ? 'Update Review' : 'Create Review'}</button>
      </form>
    </>
  );


};

export default ReviewForm;