import axios from "axios";

const GET_ALL = "GET_ALL";
const GET_CART = "GET_CART";
const CLEAR_CART = "CLEAR_CART";
const GET_USER = "GET_USER";
const GET_ORDERS = "GET_ORDERS";
const GET_USER_ORDERS = "GET_USER_ORDERS";

export function getAll() {
  return {
    type: GET_ALL,
    payload: axios
      .get("/api/getProducts")
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function getCart() {
  return {
    type: GET_CART,
    payload: axios
      .get("/api/cart")
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
    payload: axios
      .delete("/api/clearcart")
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}
export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get("/api/me")
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function getOrders(criteria) {
  return {
    type: GET_ORDERS,
    payload: axios
      .get(`/api/orders${criteria ? "/" + criteria : ""}`)
      .then(response => response.data)
      .catch(console.log)
  };
}
export function getUserOrders() {
  return {
    type: GET_USER_ORDERS,
    payload: axios
      .get("/api/userOrders")
      .then(response => response.data)
      .catch(console.log)
  };
}

const initialState = {
  products: [],
  isLoading: false,
  didErr: false,
  cart: [],
  total: 0,
  user: {},
  orders: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${GET_USER}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    case `${GET_USER}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${GET_USER_ORDERS}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${GET_USER_ORDERS}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        orders: action.payload
      });
    case `${GET_USER_ORDERS}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${GET_ORDERS}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${GET_ORDERS}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        orders: action.payload
      });
    case `${GET_ORDERS}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${GET_ALL}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${GET_ALL}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        products: action.payload
      });
    case `${GET_ALL}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${GET_CART}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${GET_CART}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        cart: action.payload.cart,
        total: action.payload.total
      });
    case `${GET_CART}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });

    default:
      return state;
  }
}
