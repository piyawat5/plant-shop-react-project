import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useNavigate } from "react-router-dom";
import { Products } from "../HomePage/HomePage";
import ProductOrderCard from "../../features/ProductOrderCard";

// type OrderDetailPageProps = {
//   //
// };

const OrderDetailPage: React.FC<any> = () => {
  const navigate = useNavigate();
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
      <PageName name="รายละเอียดคำสั่งซื้อ"></PageName>
      <Stack alignItems={"center"}>
        <Box mr={2} width={"100%"} maxWidth={571}>
          สถานะ: ยังไม่ได้ชำระเงิน
        </Box>
      </Stack>
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
            viewMode
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
            variant="outlined"
          >
            ย้อนกลับ
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderDetailPage;
