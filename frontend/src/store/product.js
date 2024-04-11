import csrfFetch from "./csrf";

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const receiveProducts = (products) => {
  return {
    type: RECEIVE_PRODUCTS,
    products: products,
  };
};

export const receiveProduct = (product) => {
  return {
    type: RECEIVE_PRODUCT,
    product: product,
  }; 
};

export const removeProduct = (product_id) => {
  return {
    type: REMOVE_PRODUCT,
    product_id: product_id,
  };
};

export const selectProduct = (product_id) => { return (state) => 
  state.products[product_id] ? state.products[product_id] : null ;
};

export const selectProductsArray = (state) => Object.values(state.products);

export const fetchProducts = () => async dispatch => {
  const response = await csrfFetch(`/api/products`);

  if (response.ok) {
    const products = await response.json();
    dispatch(receiveProducts(products));
    console.log(products);
  }
};

export const fetchProduct = (product_id) => async dispatch => {
  const response = await csrfFetch(`/api/products/${product_id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveProduct(data.product));
  }
};

export const createProduct = (product) => async dispatch => {
  const response = await fetch(`api/products`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const newProduct = await response.json();
    dispatch((receiveProduct(newProduct)));
  }
};

export const updateProduct = (product) => async dispatch => {
  const response = await fetch(`api/products/${product.id}`, {
    method: 'PATCH',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const editedProduct = await response.json();
    dispatch(receiveProduct(editedProduct));
  }
};

export const deleteProduct = (product_id) => async dispatch => {
  const response = await fetch(`api/products/${product_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (response.ok) {
    const targetProduct = await response.json();
    dispatch(removeProduct(targetProduct));
  }
};

function productsReducer(state = {}, action) {
  // debugger
  switch (action.type) {

  case RECEIVE_PRODUCTS:
    return {
      ...state,
      ...action.products,
    };

  case RECEIVE_PRODUCT:
    // debugger
    return {
      ...state,
      [action.product.id]: action.product,
    };

  case REMOVE_PRODUCT:
    return {
      ...state,
      [action.product_id]: undefined,
    };

  default: 
    return state;
  }

}

export default productsReducer;