import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { Box, Button, Stack, TextField } from "@mui/material";
import PageName from "../../features/PageName";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import { useAppDispatch } from "../../..";
import * as loginActions from "../../../redux/actions/login.action";

// type LoginPageProps = {
//   //
// };

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useAppDispatch();

  const Form = ({ handleSubmit, handleChange, values }: FormikProps<any>) => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <Stack
          borderRadius={"6px"}
          width={"100%"}
          maxWidth={428}
          padding={"36px 20px"}
          bgcolor={"white"}
          direction="column"
          spacing={4}
        >
          <TextField
            onChange={handleChange}
            value={values.email}
            disabled={loginReducer.isFetching}
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            autoFocus
            required
            fullWidth
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.password}
            disabled={loginReducer.isFetching}
            id="password"
            label="รหัสผ่าน"
            variant="outlined"
            fullWidth
            required
          ></TextField>
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/register")}
              variant="outlined"
              disabled={loginReducer.isFetching}
              color="primary"
              type="button"
              fullWidth
            >
              สมัครสมาชิก
            </Button>
            <Button
              sx={{
                color: "#fff",
              }}
              variant="contained"
              disabled={loginReducer.isFetching}
              color="primary"
              type="submit"
              fullWidth
            >
              เข้าสู่ระบบ
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  };
  const initial: any = {
    email: "",
    password: "",
  };
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <PageName name="เข้าสู่ระบบ"></PageName>
          <Formik
            initialValues={initial}
            onSubmit={async (value, { setSubmitting }) => {
              dispatch(
                loginActions.loginAction(value, (path) => navigate(path)) as any
              );
            }}
          >
            {(props) => Form(props)}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
