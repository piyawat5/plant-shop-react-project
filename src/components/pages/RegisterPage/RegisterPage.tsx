import * as React from "react";
import PageName from "../../features/PageName";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../..";
import MyDatepicker from "../../features/MyDatepicker";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import * as registerActions from "../../../redux/actions/register.action";

// type RegisterPageProps = {
//   //
// };

const RegisterPage: React.FC<any> = () => {
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );

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
          maxWidth={428}
          width={"100%"}
          padding={"36px 20px"}
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
              disabled={registerReducer.isFetching}
              fullWidth
              required
            ></TextField>
          </Stack>
          <TextField
            onChange={handleChange}
            value={values.email}
            disabled={registerReducer.isFetching}
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.password}
            disabled={registerReducer.isFetching}
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
            disabled={registerReducer.isFetching}
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
              disabled={registerReducer.isFetching}
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
              disabled={registerReducer.isFetching}
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

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Box>
          <PageName name="สมัครสมาชิก ฟรี!"></PageName>
          <Formik
            initialValues={initial}
            onSubmit={async (value, { setSubmitting }) => {
              const body = {
                ...value,
                dateOfBirth: formatDate(value?.dateOfBirth),
              };
              dispatch(
                registerActions.registerAction(body, (path) =>
                  navigate(path)
                ) as any
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

export default RegisterPage;
