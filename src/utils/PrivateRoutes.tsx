import React from "react";
import { useSelector } from "react-redux";
import { RootReducers } from "../redux/reducers";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

export default function PrivateRoutes({}: Props) {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  return loginReducer.authorization ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
}
