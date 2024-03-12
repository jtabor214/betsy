import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session.js';
import modalsReducer from './modals.js';
import productsReducer from './product.js';
import reviewsReducer from './review.js';
import searchReducer from './search.js';
import cartReducer from './cart.js';

const rootReducer = combineReducers({
  session: sessionReducer,
  modals: modalsReducer,
  products: productsReducer,
  reviews: reviewsReducer,
  search: searchReducer,
  cart: cartReducer,
});

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

let enhancer; 
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default configureStore;

