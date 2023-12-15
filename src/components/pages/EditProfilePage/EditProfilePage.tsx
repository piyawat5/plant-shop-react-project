/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Stack, TextField, useMediaQuery } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/UploadImage";
import { Formik, FormikProps } from "formik";

// type ProfilePageProps = {
//   //
// };

const EditProfilePage: React.FC<any> = () => {
  const initial = {
    fname: "",
    lname: "",
    email: "",
    image: "",
    address: "",
  };
  const navigate = useNavigate();
  const xs = useMediaQuery("(max-width: 600px)");

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
              src={`${process.env.PUBLIC_URL}/images/avatar.png`}
            ></img>
          </Box>
          <UploadImage
            handleUrl={(url) => {
              setFieldValue("image", url);
            }}
          ></UploadImage>
          <TextField
            onChange={handleChange}
            value={values.fname}
            type="fname"
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
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/profile")}
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
              ยืนยัน
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  };
  return (
    <Box>
      <PageName name="แก้ไขโปรไฟล์"></PageName>

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
  );
};

export default EditProfilePage;
