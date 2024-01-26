import csrfFetch from "./csrf";

export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';


export const receiveResults = (results) => {
  return {
    type: RECEIVE_RESULTS,
    results: results,
  };
};

export const selectResultsArray = (state) => Object.values(state.search || {});

export const fetchResults = (query) => async dispatch => {
  const response = await csrfFetch(`/api/products?query=${query}`);

  if (response.ok) {
    const results = await response.json();
    dispatch(receiveResults(results));
  }
};


function searchReducer(state = {}, action) {
  // debugger
  switch (action.type) {

  case RECEIVE_RESULTS:
    return {
      ...action.results,
    };

  default: 
    return state;
  }

}

export default searchReducer;