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

export const fetchReviews = (productId) => async dispatch => {
  const response = await csrfFetch(`/api/products/${productId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(receiveReviews(reviews));
  }
};


export const createReview = (review, productId ) => async dispatch => {
  debugger
  const response = await csrfFetch(`/api/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch((receiveReview(newReview)));
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
    const editedReview = await response.json();
    dispatch(receiveReview(editedReview));
  }
};

export const deleteReview = (productId, reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/products/${productId}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const targetReview = await response.json();
    dispatch(removeReview(targetReview));
  }
};

function reviewsReducer(state = {}, action) {
  switch (action.type) {

  case RECEIVE_REVIEWS:
    return {
      ...state,
      ...action.reviews,
    };

  case RECEIVE_REVIEW:
    return {
      ...state, 
      [action.review.id]: action.product,
    };

  case REMOVE_REVIEW:
    return {
      ...state,
      [action.reviewId]: undefined,
    };

  default:
    return state;
  }
}

export default reviewsReducer;