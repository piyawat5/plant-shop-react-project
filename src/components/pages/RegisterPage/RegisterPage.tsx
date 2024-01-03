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
import * as Yup from "yup";

// type RegisterPageProps = {
//   //
// };

const RegisterPage: React.FC<any> = () => {
  // const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("กรุณากรอกชื่อ"),
    lname: Yup.string().required("กรุณากรอกนามสกุล"),
    email: Yup.string()
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .required("กรุณากรอกอีเมล"),
    password: Yup.string()
      .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
      .matches(/[A-Z]/, "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรพิมพ์ใหญ่")
      .max(15, "รหัสผ่านต้องไม่เกิน 15 ตัวอักษร")
      .required("กรุณากรอกรหัสผ่าน"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "รหัสผ่านไม่ตรงกัน")
      .required("กรุณายืนยันรหัสผ่าน"),
  });

  const Form = ({
    handleSubmit,
    handleChange,
    setFieldValue,
    isSubmitting,
    values,
    errors,
    touched,
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
              fullWidth
              error={touched.fname && Boolean(errors.fname)}
              helperText={
                touched.fname ? (errors.fname as React.ReactNode) : undefined
              }
            ></TextField>
            {/* {Boolean(errors.fname) && (
              <Box color={"red"}>{errors.fname as React.ReactNode}</Box>
            )} */}
            <TextField
              onChange={handleChange}
              value={values.lname}
              id="lname"
              label="นามสกุล"
              variant="outlined"
              disabled={registerReducer.isFetching}
              fullWidth
              error={touched.lname && Boolean(errors.lname)}
              helperText={
                touched.lname ? (errors.lname as React.ReactNode) : undefined
              }
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
            error={touched.email && Boolean(errors.email)}
            helperText={
              touched.email ? (errors.email as React.ReactNode) : undefined
            }
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.password}
            disabled={registerReducer.isFetching}
            type="password"
            id="password"
            label="รหัสผ่าน"
            variant="outlined"
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={
              touched.password
                ? (errors.password as React.ReactNode)
                : "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษรพิมพ์ใหญ่ และต้องมีอย่างน้อย 6 ตัวอักษร"
            }
          ></TextField>
          {/* {Boolean(errors.password) && (
            <Box color={"red"}>{errors.password as React.ReactNode}</Box>
          )} */}
          <TextField
            onChange={handleChange}
            value={values.confirmPassword}
            disabled={registerReducer.isFetching}
            type="password"
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            variant="outlined"
            fullWidth
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={
              touched.confirmPassword
                ? (errors.confirmPassword as React.ReactNode)
                : undefined
            }
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
    confirmPassword: "",
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
            validationSchema={validationSchema}
            onSubmit={async (value, { setSubmitting }) => {
              let { confirmPassword, ...body } = value;

              body = {
                ...body,
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
