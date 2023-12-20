import * as React from "react";
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
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
import * as clearActions from "../../../redux/actions/clearSearch.action";
import { useAppDispatch } from "../../..";

// type AdminStockPageProps = {
//   //
// };

const AdminStockPage: React.FC<any> = () => {
  const [searchProductName, setSearchProductName] = React.useState("");
  const [searchProductType, setSearchProductType] = React.useState("");
  const [searchProductPrice, setSearchProductPrice] = React.useState({});
  // const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  // const stockIdReducer = useSelector(
  //   (state: RootReducers) => state.stockIdReducer
  // );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //modal
  const [role, setRole] = useState<ModalRoleEnum>(ModalRoleEnum.general);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const products = [
    {
      id: 1,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree2.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 2,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 3,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree3.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 4,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 5,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 6,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 7,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      id: 8,
      category: "Tree",
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
  ];

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
      field: "productName",
      headerName: "ชื่อ",
      width: 150,
    },
    {
      field: "category",
      headerName: "ประเภท",
      width: 150,
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
              // dispatch(stockIdActions.getById(row.id));
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
              // dispatch(stockIdActions.getById(row.id));
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

    console.log(searchProductName, searchProductPrice, searchProductType);
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
          // loading={stockReducer.isFetching}
          rows={products}
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
          onSubmit={() => {}}
        >
          <Stack direction={"column"} alignItems={"center"}>
            <Box fontSize={20} fontWeight={400}>
              ต้นหอมจริงๆ
            </Box>
            <img
              alt="tree"
              height={200}
              src={`${process.env.PUBLIC_URL}/images/tree2.png`}
            ></img>
            <Stack direction={"column"} spacing={2} width={300}>
              <Box>
                <span style={{ fontWeight: 400 }}>รายละเอียด: </span>
                <span style={{ fontWeight: 300, color: "grey" }}>
                  เป็นต้นที่สวยงามจุงเบย
                </span>
              </Box>
              <Box>
                <span style={{ fontWeight: 400 }}>สต็อก: </span>

                <span style={{ fontWeight: 300, color: "grey" }}>10</span>
              </Box>
              <Box>
                <span style={{ fontWeight: 400 }}> ราคา: </span>

                <span style={{ fontWeight: 300, color: "grey" }}>200</span>
              </Box>
            </Stack>
          </Stack>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          role={ModalRoleEnum.confirmDelete}
          onSubmit={() => {
            // dispatch(stockActions.deleteStock(stockIdReducer.res?.id));
          }}
          onClose={toggle}
        >
          {false ? (
            <>
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
                src={`${process.env.PUBLIC_URL}/images/tree2.png`}
              ></img>
              <Box>Do you want to delete 1?</Box>
            </Box>
          )}
        </Modal>
      )}
    </Box>
  );
};

export default AdminStockPage;
