import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../store/review';
import StarRatings from 'react-star-ratings';
import './ReviewForm.css'
// import * as reviewActions from '../../store/review';

const ReviewForm = ({review, setIsEditing, closeReview}) => {
  const dispatch = useDispatch();
  // const { reviewId } = useParams();
  const { product_id } = useParams();
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState(review?.rating || 0);
  const [body, setBody] = useState(review?.body || '');

  review ||= {rating, body};

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({body: '', rating: ''});

    const newReview = {
      ...review,
      rating,
      body,
    };

    if (!body.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, body: 'Please enter a review.' }));
    }
    if (rating === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, rating: 'Please select a rating.' }));
    }
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    if (newReview.id) {
      dispatch(updateReview(newReview));
      setIsEditing(false);
    } else {
      dispatch(createReview(newReview, product_id));
      closeReview();
    }
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
        </label>
        <br />
        <span className="error-message">{errors.rating}</span>
        {/* <input type="number" name="numericInput" onChange={(e) => setRating(e.target.value)} /> */}
        <br />
        <label htmlFor="body">Review:</label>
        <br />
        <textarea 
          id="review-form-body"
          rows="4" 
          cols="50"
          value={body} 
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <span className="error-message">{errors.body}</span>
        <br />
        <button id="submit-review-button" type="submit">{review?.id ? 'Update Review' : 'Create Review'}</button>
      </form>
    </>
  );
};

export default ReviewForm;