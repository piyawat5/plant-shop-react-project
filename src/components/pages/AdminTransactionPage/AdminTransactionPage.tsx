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
import * as orderActions from "../../../redux/actions/order.action";
import * as orderIdActions from "../../../redux/actions/orderId.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

const AdminTransactionPage: React.FC<any> = () => {
  const [search, setSearch] = useState("");
  const [searchOrderStatus, setSearchOrderStatus] = useState("");
  const orderReducer = useSelector((state: RootReducers) => state.orderReducer);
  const orderIdReducer = useSelector(
    (state: RootReducers) => state.orderIdReducer
  );

  const dispatch = useAppDispatch();
  const [role, setRole] = useState<ModalRoleEnum>(ModalRoleEnum.general);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const orders = [
    {
      id: 1,
      customerId: 1,
      order_status: OrderStatusEnum.VERIFY,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 2,
      customerId: 1,
      order_status: OrderStatusEnum.NOTPAID,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 3,
      customerId: 1,
      order_status: OrderStatusEnum.PAID,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 4,
      customerId: 1,
      order_status: OrderStatusEnum.COMPLETE,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 5,
      customerId: 1,
      order_status: OrderStatusEnum.PAID,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
    {
      id: 6,
      customerId: 1,
      order_status: OrderStatusEnum.COMPLETE,
      name: "ปิยะวัตร",
      total: 15000,
      date: "12-12-2022",
    },
  ];

  function totalPrice() {
    const result = orderIdReducer.order?.orderDetail.reduce(
      (a: number, b: any) => {
        return a + b.price;
      },
      0
    );
    return result;
  }

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
      field: "image",
      headerName: "รูปหลักฐานการโอนเงิน",
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
      field: "customer_id",
      headerName: "รหัสบัญชีผู้ใช้งาน",
      width: 150,
    },
    {
      field: "order_status",
      headerName: "สถานะ",
      width: 200,
      renderCell: ({ value }: GridRenderCellParams) => (
        <Box textAlign={"center"}>
          <OrderStatus name={value}></OrderStatus>
        </Box>
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
              setRole(ModalRoleEnum.confirm);
              dispatch(orderIdActions.getOrderById(row.id) as any);
              toggle();
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
      search,
      searchOrderStatus,
    };

    dispatch(orderActions.getOrders(combinefilter) as any);
  }, [search, searchOrderStatus]);

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
      <Stack direction={"column"} gap={3} marginBottom={4}>
        <SearchInput handleValue={setSearch}></SearchInput>
        <OrderStatusDropdown
          handleValue={setSearchOrderStatus}
        ></OrderStatusDropdown>
      </Stack>

      <Box sx={{ height: "60vh", width: "100%" }}>
        <DataGrid
          sx={{ bgcolor: "white" }}
          loading={orderReducer.isFetching}
          rows={orderReducer?.orders ? orderReducer?.orders : orders}
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

      {role === ModalRoleEnum.confirm ? (
        <Modal
          textConfirm="ตรวจสอบการโอนเงินสำเร็จ"
          role={ModalRoleEnum.confirm}
          isOpen={isOpen}
          onClose={() => {
            toggle();
          }}
          onSubmit={() => {
            const body = {
              id: orderIdReducer.order?.id,
              order_status: OrderStatusEnum.PAID,
              image: orderIdReducer.order?.image,
            };
            const combinefilter = {
              search,
              searchOrderStatus,
            };

            dispatch(
              orderActions.editOrder(body, () => {
                dispatch(orderActions.getOrders(combinefilter) as any);
              }) as any
            );
          }}
        >
          <Stack direction={"column"} gap={1} alignItems={"center"}>
            <Box fontSize={20} fontWeight={400}>
              รหัสอ้างอิง {orderIdReducer.order?.id}
            </Box>
            <img alt="tree" width={250} src={orderIdReducer.order?.image}></img>
            <Stack direction={"column"} gap={1} width={300}>
              <Box>
                <span style={{ fontWeight: 400 }}>ราคาทั้งหมด: </span>
                <span style={{ fontWeight: 300, color: "grey" }}>
                  {totalPrice()}
                </span>
              </Box>
              <Box>
                <span style={{ fontWeight: 400 }}>รหัสบัญชีผู้ใช้งาน: </span>
                <span style={{ fontWeight: 300, color: "grey" }}>
                  {orderIdReducer.order?.customer_id}
                </span>
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
