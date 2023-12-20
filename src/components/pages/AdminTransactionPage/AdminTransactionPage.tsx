import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal, { ModalRoleEnum } from "../../features/Modal/Modal";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchInput from "../../features/SearchInput";
import PageName from "../../features/PageName";
import OrderStatusDropdown from "../../features/OrderStatusDropdown";
import OrderStatus from "../../features/OrderStatus";
import { OrderStatusEnum } from "../../types/OrderStatus";
import { useAppDispatch } from "../../..";
import * as clearActions from "../../../redux/actions/clearSearch.action";

const AdminTransactionPage: React.FC<any> = () => {
  const [searchCustomer, setSearchCustomer] = React.useState("");
  const [searchOrderType, setSearchOrderType] = React.useState("");
  // const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  // const stockIdReducer = useSelector(
  //   (state: RootReducers) => state.stockIdReducer
  // );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState<ModalRoleEnum>(ModalRoleEnum.general);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const orders = [
    {
      id: 1,
      customerId: 1,
      status: OrderStatusEnum.VERIFY,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 2,
      customerId: 1,
      status: OrderStatusEnum.NOTPAID,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 3,
      customerId: 1,
      status: OrderStatusEnum.PAID,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 4,
      customerId: 1,
      status: OrderStatusEnum.COMPLETE,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 5,
      customerId: 1,
      status: OrderStatusEnum.PAID,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 6,
      customerId: 1,
      status: OrderStatusEnum.COMPLETE,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "รหัสอ้างอิง",
      width: 90,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Typography sx={{ marginLeft: 2 }} variant="body1">
          {value}
        </Typography>
      ),
    },
    {
      field: "customerId",
      headerName: "รหัสบัญชีผู้ใช้งาน",
      width: 150,
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 200,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Box textAlign={"center"}>
          <OrderStatus name={value}></OrderStatus>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อ",
      width: 150,
    },
    {
      field: "total",
      headerName: "ยอดรวม",
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
      field: "date",
      headerName: "วันที่",
      width: 150,
    },
    {
      field: ".",
      headerName: "การจัดการ",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Stack direction={"row"}>
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
    const combinefilter = {
      searchCustomer,
      searchOrderType,
    };
    console.log(combinefilter);
  }, [searchCustomer, searchOrderType]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PageName name={"ธุรกรรม"}></PageName>
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
      <Stack direction={"column"} gap={2} marginBottom={4}>
        <SearchInput handleValue={setSearchCustomer}></SearchInput>
        <OrderStatusDropdown
          handleValue={setSearchOrderType}
        ></OrderStatusDropdown>
      </Stack>

      <Box sx={{ height: "60vh", width: "100%" }}>
        <DataGrid
          sx={{ bgcolor: "white" }}
          // loading={stockReducer.isFetching}
          rows={orders}
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
          textConfirm="เพิ่มไปยังตระกร้า"
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

export default AdminTransactionPage;
