import { combineReducers } from 'redux'
import { userReducer } from "./userReducer";
import { SearchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { cartSideReducer } from "./cartsideReducer";
import { couponReducer } from "./couponReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    search: SearchReducer,
    cart: cartReducer,
    sideDraw: cartSideReducer,
    coupon : couponReducer
});

export default rootReducer;