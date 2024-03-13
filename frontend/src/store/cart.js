import csrfFetch from "./csrf";
import { createSelector } from 'reselect';

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

export const memoizedCartItems = createSelector(
	[selectCartItems],
	(cartItems) => Object.values(cartItems)
)

export const fetchCart = () => async (dispatch) => {
	const response = await csrfFetch(`/api/carts`);

	if (response.ok) {
		const cartData = await response.json();
		dispatch(receiveCart(cartData));
	}
};

export const fetchCartItem = (cartItemId) => async (dispatch) => {
	const response = await csrfFetch(`/api/carts/${cartItemId}`);

	if (response.ok) {
		const cartData = await response.json();
		dispatch(receiveCartItem(cartData))
	}
};

export const createCartItem = (cartItem) => async (dispatch) => {
	const response = await csrfFetch(`/api/carts`, {
		method: 'POST',
		body: JSON.stringify(cartItem),
		headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		},
	});

	if (response.ok) {
		const cartData = await response.json();
		dispatch(receiveCartItem(cartData.cartItem));
	}
};

export const updateCartItem = (cartItem) => async (dispatch) => {
	const response = await csrfFetch(`/api/carts/${cartItem.id}`, {
		method: 'PATCH',
		body: JSON.stringify(cartItem),
		headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		},
	});

	if (response.ok) {
		const cartData = await response.json();
		dispatch(receiveCartItem(cartData.cartItem));
	}
}; 

export const deleteCartItem = (cartItemId) => async (dispatch) => {
	const response = await csrfFetch(`/api/carts/${cartItemId}`, {
		method: 'DELETE',
		body: JSON.stringify(cartItemId),
		headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		},
	});

	if (response.ok) {
		const cartData = await response.json();
		dispatch(removeCartItem(cartData))
	}
};

const cartReducer = (state = {}, action) => {
	const newState = { ...state};
	switch (action.type) {

	case RECEIVE_CART:
		return {
		...state,
		...action.cartItem || {}
		};
	
	case RECEIVE_CART_ITEM:
		return {
			...state,
			[action.cartItem.id]: action.cartItem,
		};

	case REMOVE_CART_ITEM:
		delete newState[action.cartItemId]
		return newState;
	
	default:
		return state;
	}
}

export default cartReducer;