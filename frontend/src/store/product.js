export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCT';
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

export const removeProduct = (productId) => {
  return {
    type: REMOVE_PRODUCT,
    productId: productId,
  };
};

export const selectProduct = (productId) => { return (state) => 
  state.products[productId] ? state.products[productId] : null ;
};

export const selectProductsArray = (state) => Object.values(state.products);

export const fetchProducts = () => async dispatch => {
  const response = await fetch(`api/products`);

  if (response.ok) {
    const products = await response.json();
    dispatch(receiveProducts(products));
  }
};

export const fetchProduct = (productId) => async dispatch => {
  const response = await fetch(`api/products/${productId}`);

  if (response.ok) {
    const product = await response.json();
    dispatch(receiveProduct(product));
  }
};

export const createProduct = (product) => async dispatch => {
  const response = await fetch(`api/products`, {
    method: 'POST',
    body: JSON.stringify(product),
    header: {
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

export const deleteProduct = (productId) => async dispatch => {
  const response = await fetch(`api/products/${productId}`, {
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
  switch (action.type) {

  case RECEIVE_PRODUCTS:
    return {
      ...state,
      ...action.products,
    };

  case RECEIVE_PRODUCT:
    return {
      ...state,
      [action.product.id]: action.product,
    };

  case REMOVE_PRODUCT:
    return {
      ...state,
      [action.productId]: undefined,
    };

  default: 
    return state;
  }

}

export default productsReducer;