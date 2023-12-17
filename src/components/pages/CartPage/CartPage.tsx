import * as React from "react";
import { Products } from "../HomePage/HomePage";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import PageName from "../../features/PageName";
import Modal from "../../features/Modal";
import { ModalRoleEnum } from "../../features/Modal/Modal";
import NumberEditor from "../../features/NumberEditor";
import { useNavigate } from "react-router-dom";
import ProductOrderCard from "../../features/ProductOrderCard";
import { RollerShades } from "@mui/icons-material";

// type CartPageProps = {
//   //
// };

const CartPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [role, setRole] = React.useState(ModalRoleEnum.general);
  const products: Products[] = [
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree2.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree3.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
    {
      productName: "จุ๊กกรู้",
      image: `${process.env.PUBLIC_URL}/images/tree1.png`,
      stock: 200,
      price: 400,
    },
  ];
  return (
    <Box>
      <PageName name="ตระกร้าสินค้า"></PageName>
      <Stack
        maxHeight={400}
        sx={{ overflowY: "scroll" }}
        spacing={2}
        pt={4}
        direction={"column"}
        alignItems={"center"}
      >
        {products.map((product, index) => (
          <ProductOrderCard
            handleClickProduct={() => {
              setRole(ModalRoleEnum.general);
              setOpenModal(true);
            }}
            handleClickDelete={() => {
              setRole(ModalRoleEnum.confirmDelete);
              setOpenModal(true);
            }}
            key={index}
            productName={product.productName}
            price={product.price}
            quantity={10}
            image={product.image}
          ></ProductOrderCard>
        ))}
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
            ยอดทั้งหมด: 1000000 บาท
          </Box>
          <Button
            onClick={() => {
              //post api

              navigate("/payment");
            }}
            sx={{ color: "white" }}
            variant="contained"
          >
            สั่งซื้อสินค้า
          </Button>
        </Stack>
      </Box>
      {role === ModalRoleEnum.general ? (
        <Modal
          onClose={() => setOpenModal(false)}
          isOpen={openModal}
          onSubmit={() => {}}
          role={ModalRoleEnum.confirm}
          textConfirm="ยืนยัน"
        >
          <Stack direction={"column"} alignItems={"center"}>
            <Box fontSize={20} fontWeight={400}>
              ต้นหอมจริงๆ
            </Box>
            <img
              alt="Tree"
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

                  <span style={{ fontWeight: 300, color: "grey" }}>200</span>
                </Box>
                <Box
                  gap={2}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Box>จำนวน: </Box>
                  <NumberEditor handleValue={(value) => {}}></NumberEditor>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Modal>
      ) : (
        <Modal
          isOpen={openModal}
          role={ModalRoleEnum.confirmDelete}
          onSubmit={() => {
            // dispatch(stockActions.deleteStock(stockIdReducer.res?.id));
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
                src={`${process.env.PUBLIC_URL}/images/tree2.png`}
              ></img>
              <Box>Do you want to remove 1 from cart ?</Box>
            </Box>
          )}
        </Modal>
      )}
    </Box>
  );
};

export default CartPage;
