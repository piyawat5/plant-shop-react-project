import * as React from "react";
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Modal, { ModalRoleEnum } from "../../features/Modal/Modal";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Add, Clear } from "@mui/icons-material";
import ProductTypeDropdown from "../../features/ProductTypeDropdown";
import SearchProductPrice from "../../features/SearchProductPrice";
import PageName from "../../features/PageName";
import SearchInput from "../../features/SearchInput";
import { useAppDispatch } from "../../..";
import * as clearActions from "../../../redux/actions/clearSearch.action";
import * as productActions from "../../../redux/actions/product.action";
import * as productIdActions from "../../../redux/actions/productId.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

// type AdminStockPageProps = {
//   //
// };

const AdminStockPage: React.FC<any> = () => {
  const [searchProductName, setSearchProductName] = React.useState("");
  const [searchProductType, setSearchProductType] = React.useState("");
  const [searchProductPrice, setSearchProductPrice] = React.useState({});
  const productsReducer = useSelector(
    (state: RootReducers) => state.productReducer
  );
  const productIdReducer = useSelector(
    (state: RootReducers) => state.productIdReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //modal
  const [role, setRole] = useState<ModalRoleEnum>(ModalRoleEnum.general);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "รหัสสินค้า",
      width: 90,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Typography sx={{ marginLeft: 2 }} variant="body1">
          {value}
        </Typography>
      ),
    },
    {
      field: "image",
      headerName: "รูปสินค้า",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams) => {
        return (
          <img
            alt="Tree"
            src={value}
            style={{ width: 80, height: 70, borderRadius: "5%" }}
          ></img>
        );
      },
    },
    {
      field: "name",
      headerName: "ชื่อ",
      width: 150,
    },
    {
      field: "category",
      headerName: "ประเภท",
      width: 150,
      valueGetter(params) {
        return params.row.category.name;
      },
    },
    {
      field: "price",
      headerName: "ราคา(บาท)",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator
            fixedDecimalScale
            prefix="฿ "
            decimalScale={2}
          ></NumericFormat>
        </Typography>
      ),
    },
    {
      field: "stock",
      headerName: "สต็อก",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator
            fixedDecimalScale
            decimalScale={0}
          ></NumericFormat>
        </Typography>
      ),
    },
    {
      field: ".",
      headerName: "การจัดการ",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Stack direction={"row"}>
          <IconButton
            onClick={() => {
              setRole(ModalRoleEnum.general);
              dispatch(productIdActions.productIdAction(row.id) as any);
              toggle();
            }}
          >
            <RemoveRedEyeIcon></RemoveRedEyeIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              navigate(`/admin-edit-stock/${row.id}`);
            }}
          >
            <EditIcon sx={{ color: "rgb(70, 70, 175)" }}></EditIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              setRole(ModalRoleEnum.confirmDelete);
              dispatch(productIdActions.productIdAction(row.id) as any);
              toggle();
            }}
          >
            <DeleteForeverIcon
              sx={{ color: "rgb(201, 45, 45)" }}
            ></DeleteForeverIcon>
          </IconButton>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    const combindFilter = {
      searchProductName,
      searchProductPrice,
      searchProductType,
    };

    dispatch(productActions.ProductAction(combindFilter) as any);
  }, [searchProductName, searchProductPrice, searchProductType]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PageName name={"คลังสินค้า"}></PageName>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box fontSize={20} mb={1}>
          Filter
        </Box>
        <Button
          onClick={() => dispatch(clearActions.handleClearSearch() as any)}
        >
          CLEAR
        </Button>
      </Stack>
      <Grid container gap={3} marginBottom={4}>
        <Grid item xs={12} sm={12} lg={12}>
          <SearchInput handleValue={setSearchProductName}></SearchInput>
        </Grid>
        <Grid item xs={12} sm={5.5} lg={5.5}>
          <ProductTypeDropdown
            handleValue={setSearchProductType}
          ></ProductTypeDropdown>
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <SearchProductPrice
            handleValue={setSearchProductPrice}
          ></SearchProductPrice>
        </Grid>
      </Grid>
      <Box textAlign={"right"} marginBottom={4}>
        <Fab
          to="/admin-add-stock"
          component={Link}
          sx={{ color: "white" }}
          color="primary"
          aria-label="add"
        >
          <Add />
        </Fab>
      </Box>
      <Box sx={{ height: "60vh", width: "100%" }}>
        <DataGrid
          sx={{ bgcolor: "white" }}
          loading={productsReducer.isFetching}
          rows={productsReducer.products}
          columns={columns}
          getRowHeight={() => 80}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>

      {role === ModalRoleEnum.general ? (
        <Modal
          role={ModalRoleEnum.general}
          isOpen={isOpen}
          onClose={() => {
            toggle();
          }}
        >
          {productIdReducer.isFetching ? (
            <>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Box sx={{ my: 2 }}></Box>
            </>
          ) : (
            <Stack direction={"column"} alignItems={"center"}>
              <Box fontSize={20} fontWeight={400}>
                {productIdReducer.product?.name}
              </Box>
              <img
                alt="tree"
                height={200}
                src={productIdReducer.product?.image}
              ></img>
              <Stack direction={"column"} spacing={2} width={300}>
                <Box>
                  <span style={{ fontWeight: 400 }}>รายละเอียด: </span>
                  <span style={{ fontWeight: 300, color: "grey" }}>
                    {productIdReducer.product?.description}
                  </span>
                </Box>
                <Box>
                  <span style={{ fontWeight: 400 }}>สต็อก: </span>

                  <span style={{ fontWeight: 300, color: "grey" }}>
                    {productIdReducer.product?.stock}
                  </span>
                </Box>
                <Box>
                  <span style={{ fontWeight: 400 }}> ราคา: </span>

                  <span style={{ fontWeight: 300, color: "grey" }}>
                    {productIdReducer.product?.price}
                  </span>
                </Box>
              </Stack>
            </Stack>
          )}
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          role={ModalRoleEnum.confirmDelete}
          onSubmit={async () => {
            await dispatch(
              productActions.ProductDelete(productIdReducer.product?.id) as any
            );
            dispatch(productActions.ProductAction() as any);
          }}
          onClose={toggle}
        >
          {productIdReducer.isFetching ? (
            <>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Skeleton animation="wave"></Skeleton>
              <Box sx={{ my: 2 }}></Box>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <h1 className="modal-title">Confirm delete</h1>
              <img
                alt="tree"
                height={200}
                src={productIdReducer.product.image}
              ></img>
              <Box>Do you want to delete {productIdReducer.product?.name}?</Box>
            </Box>
          )}
        </Modal>
      )}
    </Box>
  );
};

export default AdminStockPage;
