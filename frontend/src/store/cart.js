import csrfFetch from "./csrf";

export const RECEIVE_CART = "cart/RECIEVE_CART";
export const RECEIVE_CART_ITEM = "cart/RECEIVE_CART_ITEM";
export const REMOVE_CART_ITEM = "cart/REMOVE_CART_ITEM";
export const CLEAR_CART = "cart/CLEAR_CART";

export const receiveCart = (cart) => {
	return {
    type: RECEIVE_CART,
    cart: cart,
	};
};

export const receiveCartItem = (cartItem) => {
	return {
    type: RECEIVE_CART_ITEM,
    cartItem: cartItem,
	};
};

export const removeCartItem = (cartItemId) => {
	return {
    type: REMOVE_CART_ITEM,
    cartItemId: cartItemId,
	};
};

export const selectCartItem = (cartItemId) => { return (state) =>
  state?.cart ? state.cart[cartItemId] : null ;
};

export const selectCartItems = (state) => state?.cart || {}; 

export const fetchCart = () => async (dispatch) => {
	const response = await csrfFetch(`/api/carts`);

	if (response.ok) {
		const cartData = await response.json();
		dispatch(receiveCart(cartData));
	}
};

export const fetchCartItem = (cartItemId) => async (dispatch) => [
	const response = await csrfFetch(`/api/carts/${cartItemId}`);

	if
]