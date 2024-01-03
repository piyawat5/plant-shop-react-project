/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import * as customerActions from "../../../redux/actions/customer.action";
import { useEffect } from "react";
import { useAppDispatch } from "../../..";

// type ProfilePageProps = {
//   //
// };

const ProfilePage: React.FC<any> = () => {
  const xs = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const customerReducer = useSelector(
    (state: RootReducers) => state.customerReducer
  );

  useEffect(() => {
    dispatch(
      customerActions.getCustomerById(
        loginReducer.authorization.customer.id
      ) as any
    );
  }, []);

  return (
    <Box>
      <PageName name="โปรไฟล์"></PageName>
      <Stack
        position={"relative"}
        p={xs ? 1 : 4}
        pt={15}
        mt={20}
        borderRadius={4}
        bgcolor={"white"}
        sx={{ minWidth: 275 }}
        direction={"column"}
        justifyContent={"center"}
        spacing={2}
      >
        <Box sx={{ position: "absolute", top: -100, left: 30 }}>
          <img
            style={{ outline: "12px solid #EFEFEF", borderRadius: 100 }}
            height={200}
            width={200}
            src={
              customerReducer.customer?.image
                ? customerReducer.customer?.image
                : `${process.env.PUBLIC_URL}/images/avatar.png`
            }
          ></img>
        </Box>
        <Typography>
          {customerReducer.customer?.fname} {customerReducer.customer?.lname}
        </Typography>
        <Typography>Email: {loginReducer.authorization.email}</Typography>
        <Button
          onClick={() => {
            navigate("/edit-profile");
          }}
          sx={{ color: "white" }}
          variant="contained"
        >
          แก้ไขโปรไฟล์
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
