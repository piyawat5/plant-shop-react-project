import * as React from "react";
import PageName from "../../features/PageName";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
  FormikValues,
} from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../..";
import { stringify } from "querystring";
import MyDatepicker from "../../features/MyDatepicker";

// type RegisterPageProps = {
//   //
// };

const RegisterPage: React.FC<any> = () => {
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  // const stockReducers = useSelector(
  //   (state: RootReducers) => state.stockReducer
  // );
  const dispatch = useAppDispatch();

  const Form = ({
    handleSubmit,
    handleChange,
    setFieldValue,
    isSubmitting,
    values,
  }: FormikProps<any>) => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <Stack
          borderRadius={"6px"}
          width={428}
          padding={"48px"}
          bgcolor={"white"}
          direction="column"
          spacing={4}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={handleChange}
              value={values.fname}
              id="fname"
              label="ชื่อ"
              variant="outlined"
              autoFocus
              required
              fullWidth
            ></TextField>
            <TextField
              onChange={handleChange}
              value={values.lname}
              id="lname"
              label="นามสกุล"
              variant="outlined"
              fullWidth
              required
            ></TextField>
          </Stack>
          <TextField
            onChange={handleChange}
            value={values.email}
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
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
          <TextField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            variant="outlined"
            fullWidth
            required
          ></TextField>

          <MyDatepicker
            value={values?.dateOfBirth}
            handleDate={(date) => setFieldValue("dateOfBirth", date)}
          ></MyDatepicker>
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/login")}
              variant="outlined"
              // disabled={registerReducer.isFetching}
              color="primary"
              type="button"
              fullWidth
            >
              ย้อนกลับ
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
              สมัครสมาชิก
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  };
  const initial: any = {
    fname: "",
    lname: "",
    dateOfBirth: new Date(),
    email: "",
    password: "",
  };
  return (
    <Box paddingX={"50px"}>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Box>
          <PageName name="สมัครสมาชิก ฟรี!"></PageName>
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

export default RegisterPage;
