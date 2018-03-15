import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const SEARCH_PRODUCTS_NAME = "SEARCH_PRODUCTS_NAME";
const GET_CART = "GET_CART";
const CLEAR_CART = "CLEAR_CART";
const GET_USER = "GET_USER";
const GET_ORDERS = "GET_ORDERS";
const GET_USER_ORDERS = "GET_USER_ORDERS";
const CHECKOUT = "CHECKOUT";
const EDIT_USER_INFO = "EDIT_USER_INFO";

export function getProducts(param) {
  return {
    type: GET_PRODUCTS,
    payload: axios
      .get(`/api/getProducts${param ? "/" + param : ""}`)
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}
export function searchProductsName(category, query) {
  return {
    type: SEARCH_PRODUCTS_NAME,
    payload: axios
      .get(`/api/getProducts${category ? "/" + category : ""}`)
      .then(response => {
        return response.data.filter((val, index) => {
          return val.name.toLowerCase().includes(query.toLowerCase());
        });
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
export function getUserOrders(uid) {
  return {
    type: GET_USER_ORDERS,
    payload: axios
      .get(`/api/userOrders/${uid}`)
      .then(response => response.data)
      .catch(console.log)
  };
}
export function checkOut() {
  return {
    type: CHECKOUT,
    payload: axios
      .get("/api/checkOut")
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(console.log)
  };
}
export function editUserInfo(body) {
  return {
    type: EDIT_USER_INFO,
    //body must be an object
    payload: axios
      .put("/api/edit", body)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
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
  orders: [],
  currentOrder: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SEARCH_PRODUCTS_NAME}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${SEARCH_PRODUCTS_NAME}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        products: action.payload
      });
    case `${SEARCH_PRODUCTS_NAME}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });
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
    case `${EDIT_USER_INFO}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${EDIT_USER_INFO}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        //user must be given req.user via backend
        user: action.payload
      });
    case `${EDIT_USER_INFO}_REJECTED`:
      console.log("rejected");
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${CHECKOUT}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${CHECKOUT}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        currentOrder: action.payload
      });
    case `${CHECKOUT}_REJECTED`:
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
    case `${GET_PRODUCTS}_PENDING`:
      console.log("pending");
      return Object.assign({}, state, { isLoading: true });
    case `${GET_PRODUCTS}_FULFILLED`:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        products: action.payload
      });
    case `${GET_PRODUCTS}_REJECTED`:
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
