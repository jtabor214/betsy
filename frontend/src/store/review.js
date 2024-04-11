import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    reviews: reviews,
  };
};

export const receiveReview = (review) => {
  return {
    type: RECEIVE_REVIEW, 
    review: review,
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId: reviewId,
  };
};

export const selectReview = (reviewId) => { return (state) =>
  state.reviews[reviewId] ? state.reviews[reviewId] : null ;
};

export const selectReviewArray = (state) => Object.values(state.reviews);

export const fetchReviews = (product_id) => async dispatch => {
  const response = await csrfFetch(`/api/products/${product_id}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(receiveReviews(reviews));
  }
};


export const createReview = (review, product_id ) => async dispatch => {
  // debugger
  const response = await csrfFetch(`/api/products/${product_id}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch((receiveReview(data.review)));
  }
};

export const updateReview = (review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PATCH',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReview(data.review));
  }
};

export const deleteReview = (product_id, reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/products/${product_id}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));
  }
};

function reviewsReducer(state = {}, action) {
  const newState = {...state};
  switch (action.type) {

  case RECEIVE_REVIEWS:
    return {
      ...state,
      ...action.reviews,
    };

  case RECEIVE_REVIEW:
    return {
      ...state, 
      [action.review.id]: action.review,
    };

  case REMOVE_REVIEW:
    delete newState[action.reviewId];
    return newState;


  default:
    return state;
  }
}

export default reviewsReducer;