import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import PageName from "../PageName";
import UploadImage from "../../../utils/UploadImage";

type StockFormProps = {
  product?: any;
};

const StockForm: React.FC<StockFormProps> = ({ product }) => {
  const navigate = useNavigate();
  let initial = {
    productName: "",
    price: 0,
    quantity: 0,
    image: "",
  };

  const Form = ({ handleSubmit, handleChange, values }: FormikProps<any>) => {
    return (
      <form
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        action=""
        onSubmit={handleSubmit}
      >
        <Stack
          borderRadius={"6px"}
          maxWidth={428}
          width={"100%"}
          padding={"36px 20px"}
          bgcolor={"white"}
          direction="column"
          spacing={4}
        >
          <TextField
            onChange={handleChange}
            value={values.productName}
            id="productName"
            label="ชื่อสินค้า"
            variant="outlined"
            autoFocus
            required
            fullWidth
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.price}
            id="price"
            label="ราคา"
            variant="outlined"
            fullWidth
            required
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.quantity}
            id="quantity"
            label="จำนวน"
            variant="outlined"
            fullWidth
            required
          ></TextField>
          <UploadImage handleUrl={() => {}}></UploadImage>
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/admin-stock")}
              variant="outlined"
              // disabled={registerReducer.isFetching}
              color="primary"
              type="button"
              fullWidth
            >
              ย้อนกลับ
            </Button>
            {product ? (
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
                ยืนยันการแก้ไขสินค้า
              </Button>
            ) : (
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
                ยืนยันการสร้างสินค้า
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    );
  };

  return (
    <Formik
      initialValues={product ? product : initial}
      onSubmit={async (value, { setSubmitting }) => {
        if (product) {
          console.log(value);
          //post api
        } else {
          //put api
        }
        setSubmitting(false);
      }}
    >
      {(props) => Form(props)}
    </Formik>
  );
};

export default StockForm;
