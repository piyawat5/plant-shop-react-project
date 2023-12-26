import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import productReducer, { ProductsState } from "./product.reducer";
import productIdReducer, { ProductIdState } from "./productId.reducer";
import clearSearchReducer, { ClearSearchState } from "./clearSearch.reducer";
import loginReducer, { LoginState } from "./login.reducer";
import cartReducer, { CartState } from "./cart.reducer";
import orderReducer, { OrderState } from "./order.reducer";
import orderIdReducer, { OrderIdState } from "./orderId.reducer";
import carouselReducer, { CarouselState } from "./carousel.reducer";

export default combineReducers({
    registerReducer, loginReducer, productReducer
    , productIdReducer, clearSearchReducer, orderReducer, orderIdReducer, cartReducer, carouselReducer
})

export interface RootReducers {
    registerReducer: RegisterState;
    loginReducer: LoginState;
    productReducer: ProductsState;
    productIdReducer: ProductIdState;
    clearSearchReducer: ClearSearchState;
    orderReducer: OrderState;
    orderIdReducer: OrderIdState;
    cartReducer: CartState;
    carouselReducer: CarouselState;
}