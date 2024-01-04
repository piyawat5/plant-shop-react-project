import * as React from "react";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import PageName from "../../features/PageName";
import Modal from "../../features/Modal";
import { ModalRoleEnum } from "../../features/Modal/Modal";
import NumberEditor from "../../features/NumberEditor";
import { useNavigate } from "react-router-dom";
import ProductOrderCard from "../../features/ProductOrderCard";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../..";
import * as cartActions from "../../../redux/actions/cart.action";
import * as orderActions from "../../../redux/actions/order.action";
import * as productIdActions from "../../../redux/actions/productId.action";
import { OrderStatusEnum } from "../../types/OrderStatus";

const CartPage: React.FC<any> = () => {
  const [quantity, setQuantity] = React.useState(1);
  const navigate = useNavigate();

  //redux
  const dispatch = useAppDispatch();
  const cartReducer = useSelector((state: RootReducers) => state.cartReducer);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const productIdReducer = useSelector(
    (state: RootReducers) => state.productIdReducer
  );

  //modal
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState(ModalRoleEnum.general);

  function totalPrice() {
    const result = cartReducer.order?.orderDetail.reduce(
      (a: number, b: any) => {
        return a + b.price;
      },
      0
    );
    return result;
  }

  useEffect(() => {
    dispatch(
      cartActions.getCart(loginReducer.authorization.customer.id) as any
    );
  }, []);

  return (
    <Box>
      <PageName name="ตระกร้าสินค้า"></PageName>
      <Stack
        maxHeight={400}
        sx={{ overflowY: "scroll" }}
        spacing={2}
        py={4}
        direction={"column"}
        alignItems={"center"}
      >
        {!cartReducer.order?.orderDetail ? (
          <></>
        ) : (
          cartReducer?.order?.orderDetail?.map((item: any) => (
            <ProductOrderCard
              handleClickProduct={async () => {
                await dispatch(
                  productIdActions.productIdAction(item.product?.id) as any
                );
                setRole(ModalRoleEnum.confirm);
                setOpenModal(true);
              }}
              handleClickDelete={async () => {
                setRole(ModalRoleEnum.confirmDelete);
                await dispatch(
                  productIdActions.productIdAction(item.product?.id) as any
                );
                setOpenModal(true);
              }}
              key={item.product.id}
              productName={item.product.name}
              price={item.price}
              quantity={item.quantity}
              image={item.product.image}
            ></ProductOrderCard>
          ))
        )}
      </Stack>
      <Box display={"flex"} justifyContent={"center"}>
        <Stack
          mr={2}
          width={"100%"}
          maxWidth={571}
          direction={"column"}
          pt={1}
          spacing={2}
        >
          <Box fontSize={20} fontWeight={400} textAlign={"right"}>
            ยอดทั้งหมด: {totalPrice() > 0 ? totalPrice() : 0} บาท
          </Box>
          <Button
            onClick={() => {
              //post api
              const body = {
                id: cartReducer.order?.id,
                order_status: OrderStatusEnum.NOTPAID,
              };
              dispatch(
                orderActions.editOrder(body, () =>
                  navigate(`/payment/${cartReducer.order?.id}`)
                ) as any
              );
            }}
            sx={{ color: "white" }}
            variant="contained"
            disabled={
              cartReducer.order?.orderDetail?.length < 1 ||
              !cartReducer.order?.orderDetail
            }
          >
            สั่งซื้อสินค้า
          </Button>
        </Stack>
      </Box>
      {role === ModalRoleEnum.confirm ? (
        <Modal
          onClose={() => setOpenModal(false)}
          isOpen={openModal}
          onSubmit={async () => {
            const scrollPosition = window.scrollY;
            let body = {
              customer_id: loginReducer.authorization.customer.id,
              product_id: productIdReducer.product.id,
              quantity: quantity,
              price: productIdReducer.product.price,
            };
            await dispatch(orderActions.postOrders(body) as any);
            window.scrollTo(0, scrollPosition);

            dispatch(
              cartActions.getCart(loginReducer.authorization.customer.id) as any
            );
          }}
          role={ModalRoleEnum.confirm}
          textConfirm="ยืนยัน"
        >
          <Stack direction={"column"} alignItems={"center"}>
            <Box fontSize={20} fontWeight={400}>
              {productIdReducer.product?.name}
            </Box>
            <img
              alt="Tree"
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <span style={{ fontWeight: 400 }}> ราคา: </span>

                  <span style={{ fontWeight: 300, color: "grey" }}>
                    {productIdReducer.product?.price}
                  </span>
                </Box>
                <Box
                  gap={2}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Box>จำนวน: </Box>
                  <NumberEditor
                    handleValue={(value) => {
                      setQuantity(value);
                    }}
                  ></NumberEditor>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Modal>
      ) : (
        <Modal
          isOpen={openModal}
          role={ModalRoleEnum.confirmDelete}
          onSubmit={async () => {
            const findOrderDetailByProductId =
              cartReducer.order?.orderDetail?.find(
                (item: any) => item.product?.id === productIdReducer.product?.id
              );
            await dispatch(
              orderActions.deleteOrderFromCart(
                cartReducer.order.id,
                productIdReducer.product.id,
                findOrderDetailByProductId.quantity
              ) as any
            );
            dispatch(
              cartActions.getCart(
                loginReducer.authorization?.customer?.id
              ) as any
            );
          }}
          onClose={() => setOpenModal(false)}
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
                src={productIdReducer.product?.image}
              ></img>
              <Box>
                Do you want to remove {productIdReducer.product?.name} from cart
                ?
              </Box>
            </Box>
          )}
        </Modal>
      )}
    </Box>
  );
};

export default CartPage;
