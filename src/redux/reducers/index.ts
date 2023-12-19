import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import productReducer, { ProductsState } from "./product.reducer";
import productIdReducer, { ProductIdState } from "./productId.reducer";

export default combineReducers({
    registerReducer, productReducer
    , productIdReducer
})

export interface RootReducers {
    registerReducer: RegisterState;
    productReducer: ProductsState;
    productIdReducer: ProductIdState;
}