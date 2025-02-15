import productReducer from './Reducers/productReducer';
import userReducer from './Reducers/userReducer';
import cartReducer from './Reducers/cartReducer';

const rootReducer = {
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
};
export default rootReducer;
