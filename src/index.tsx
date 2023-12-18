import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore } from "redux";
import { Middleware, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./redux/reducers";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import ScrollToTop from "./components/features/ScrollToTop";

export const middlewares: Middleware[] = [thunk];

middlewares.push(logger);

export const store = createStore(reducers, applyMiddleware(...middlewares));

// fix error useDispatch type;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop></ScrollToTop>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
