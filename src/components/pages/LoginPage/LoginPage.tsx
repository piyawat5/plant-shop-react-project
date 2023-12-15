import * as React from "react";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../..";
import { Formik, FormikProps } from "formik";
import { Box, Button, Stack, TextField } from "@mui/material";
import PageName from "../../features/PageName";

// type LoginPageProps = {
//   //
// };

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  // const stockReducers = useSelector(
  //   (state: RootReducers) => state.stockReducer
  // );
  // const dispatch = useAppDispatch();

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
              // disabled={registerReducer.isFetching}
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
              // disabled={registerReducer.isFetching}
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
              console.log(value);
              setSubmitting(false);
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
