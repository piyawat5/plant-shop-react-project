import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import productReducer, { ProductsState } from "./product.reducer";
import productIdReducer, { ProductIdState } from "./productId.reducer";
import clearSearchReducer, { ClearSearchState } from "./clearSearch.reducer";
import loginReducer, { LoginState } from "./login.reducer";

export default combineReducers({
    registerReducer, loginReducer, productReducer
    , productIdReducer, clearSearchReducer
})

export interface RootReducers {
    registerReducer: RegisterState;
    loginReducer: LoginState;
    productReducer: ProductsState;
    productIdReducer: ProductIdState;
    clearSearchReducer: ClearSearchState;
}