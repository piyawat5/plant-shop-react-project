import { Box, Button, Stack, TextField } from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/UploadImage";
import * as productActions from "../../../redux/actions/product.action";
import { useAppDispatch } from "../../..";
import ProductTypeDropdown from "../ProductTypeDropdown";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

type StockFormProps = {
  action: "ADD" | "EDIT";
};

const StockForm: React.FC<StockFormProps> = ({ action }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = React.useState("");
  const productIdReducer = useSelector(
    (state: RootReducers) => state.productIdReducer
  );
  const productReducer = useSelector(
    (state: RootReducers) => state.productReducer
  );
  const uploadReducer = useSelector(
    (state: RootReducers) => state.uploadReducer
  );
  const checkImage = () => {
    if (action === "ADD") {
      if (imageUrl) {
        return imageUrl;
      }
      return;
    }

    if (imageUrl) {
      return imageUrl;
    }
    return productIdReducer.product?.image;
  };
  const initial = {
    name: "",
    category: { name: "" },
    price: 0,
    stock: 0,
    image: "",
    description: "",
  };

  const Form = ({
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
  }: FormikProps<any>) => {
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
            value={values?.name}
            id="name"
            label="ชื่อสินค้า"
            variant="outlined"
            autoFocus
            required
            fullWidth
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values?.description}
            id="description"
            label="รายละเอียดสินค้า"
            variant="outlined"
            autoFocus
            required
            fullWidth
          ></TextField>
          <ProductTypeDropdown
            required
            searchQuery={values?.category?.name}
            handleValue={(value) => setFieldValue("category.name", value)}
          ></ProductTypeDropdown>
          <TextField
            onChange={handleChange}
            value={values?.price}
            id="price"
            label="ราคา"
            variant="outlined"
            fullWidth
            required
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values?.stock}
            id="stock"
            label="จำนวน"
            variant="outlined"
            fullWidth
            required
          ></TextField>

          {action === "EDIT" || imageUrl ? (
            <img alt="product" src={checkImage()}></img>
          ) : (
            <></>
          )}
          <UploadImage
            handleUrl={(url) => {
              setImageUrl(url);
              setFieldValue("image", url);
            }}
          ></UploadImage>
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/admin-stock")}
              variant="outlined"
              disabled={uploadReducer.isFetching || productReducer.isFetching}
              color="primary"
              type="button"
              fullWidth
            >
              ย้อนกลับ
            </Button>
            {productIdReducer.product ? (
              <Button
                sx={{
                  color: "#fff",
                }}
                variant="contained"
                disabled={uploadReducer.isFetching || productReducer.isFetching}
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
                disabled={uploadReducer.isFetching || productReducer.isFetching}
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
      enableReinitialize
      initialValues={
        action === "EDIT"
          ? productIdReducer.product
            ? productIdReducer.product
            : initial
          : initial
      }
      onSubmit={async (value, { setSubmitting }) => {
        if (action === "EDIT") {
          //put api
          console.log("Edit", value);
          dispatch(
            productActions.ProductEdit(value, (path) => navigate(path)) as any
          );
        } else {
          //post api
          let { category, ...valueObject } = value;
          valueObject = { ...valueObject, categoryName: category.name };
          dispatch(
            productActions.ProductPost(valueObject, (path) =>
              navigate(path)
            ) as any
          );
        }
        setSubmitting(false);
      }}
    >
      {(props) => Form(props)}
    </Formik>
  );
};

export default StockForm;
