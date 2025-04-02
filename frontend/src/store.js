import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { productDetailReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
      },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,  // ✅ Ensure this matches ProductScreen.js
    cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))  // ✅ Fix incorrect import
);

export default store;
