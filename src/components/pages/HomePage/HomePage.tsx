/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import "./HomePage.css";
import ProductCard from "../../features/ProductCard";
import Carousel from "../../features/Carousel";
import { Box, Grid, Skeleton, Stack, useMediaQuery } from "@mui/material";
import CategoryCard from "../../features/CategoryCard";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../features/ArticleCard";
import Modal from "../../features/Modal";
import { ModalRoleEnum } from "../../features/Modal/Modal";
import NumberEditor from "../../features/NumberEditor";
import FireFly from "../../features/FireFly";
import { useAppDispatch } from "../../..";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import * as productActions from "../../../redux/actions/product.action";
import * as productIdActions from "../../../redux/actions/productId.action";
import * as orderActions from "../../../redux/actions/order.action";
import * as cartActions from "../../../redux/actions/cart.action";
import * as customerActions from "../../../redux/actions/customer.action";
import { useState } from "react";

// type HomePageProps = {
//   //
// };
type Categories = {
  title: string;
  image: string;
  category: string;
};

export type Products = {
  productName: string;
  image: string;
  stock: number;
  price: number;
};

type BestSellerUsers = {
  left: number;
  zIndex: number;
  image: string;
};

type Article = {
  image: string;
  title: string;
  reply: number;
};

const HomePage: React.FC<any> = () => {
  const xs = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const [savePositionCaurosel, setSavePositionCaurosel] = useState(false);

  //state management
  const dispatch = useAppDispatch();
  const productReducer = useSelector(
    (state: RootReducers) => state.productReducer
  );
  const productIdReducer = useSelector(
    (state: RootReducers) => state.productIdReducer
  );
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const orderReducer = useSelector((state: RootReducers) => state.orderReducer);
  const customerReducer = useSelector(
    (state: RootReducers) => state.customerReducer
  );
  const categories: Categories[] = [
    {
      title: "ต้นไม้",
      image: `${process.env.PUBLIC_URL}/images/plant.png`,
      category: "Tree",
    },
    {
      title: "ดิน & ปุ๋ย",
      image: `${process.env.PUBLIC_URL}/images/fertilizer.png`,
      category: "Soil",
    },
    {
      title: "อุปกรณ์",
      image: `${process.env.PUBLIC_URL}/images/watering-can.png`,
      category: "Equipment",
    },
    {
      title: "ของตกแต่ง",
      image: `${process.env.PUBLIC_URL}/images/flamingo.png`,
      category: "Decoration",
    },
    {
      title: "ยา",
      image: `${process.env.PUBLIC_URL}/images/pesticide.png`,
      category: "Insecticide",
    },
    {
      title: "เมล็ด",
      image: `${process.env.PUBLIC_URL}/images/seed.png`,
      category: "Seed",
    },
  ];
  const bestSellerUsers: BestSellerUsers[] = [
    {
      left: 0,
      zIndex: 5,
      image: `${process.env.PUBLIC_URL}/images/user1.png`,
    },
    {
      left: -15,
      zIndex: 4,
      image: `${process.env.PUBLIC_URL}/images/user2.png`,
    },
    {
      left: -30,
      zIndex: 3,
      image: `${process.env.PUBLIC_URL}/images/user3.png`,
    },
    {
      left: -45,
      zIndex: 2,
      image: `${process.env.PUBLIC_URL}/images/user4.png`,
    },
    {
      left: -60,
      zIndex: 1,
      image: `${process.env.PUBLIC_URL}/images/user5.png`,
    },
  ];
  const articles: Article[] = [
    {
      image: `${process.env.PUBLIC_URL}/images/user1.png`,
      reply: 12,
      title: "ความเข้าใจผิดเกี่ยวกับปุ๋ยเคมี",
    },
    {
      image: `${process.env.PUBLIC_URL}/images/user2.png`,
      reply: 12,
      title: "ไม้ยืนต้น",
    },
    {
      image: `${process.env.PUBLIC_URL}/images/user3.png`,
      reply: 12,
      title: "8 สิ่งที่ต้องรู้เกี่ยวกับบอนไซ",
    },
    {
      image: `${process.env.PUBLIC_URL}/images/user4.png`,
      reply: 12,
      title: "ยากำจัดวัชพืช",
    },
  ];

  React.useEffect(() => {
    const _getData = async () => {
      await dispatch(productActions.ProductAction() as any);
      dispatch(
        customerActions.getCustomerById(
          loginReducer.authorization.customer.id
        ) as any
      );
    };
    _getData();
  }, []);

  return (
    <Box>
      {productReducer.isFetching || orderReducer.isFetching ? (
        <Skeleton height={500}></Skeleton>
      ) : (
        <Box>
          <Grid alignItems={"center"} spacing={3} container marginBottom={5}>
            <Grid item textAlign={"center"} xs={12} sm={12} md={12} lg={6}>
              <Box fontSize={xs ? 20 : 24}>
                ยินดีต้อนรับ คุณ{" "}
                {customerReducer.customer?.fname
                  ? loginReducer.authorization?.fname
                  : customerReducer.customer?.fname}{" "}
                {customerReducer.customer?.lname
                  ? customerReducer.customer?.lname
                  : loginReducer.authorization?.lname}
              </Box>
              <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                <Stack
                  position={"relative"}
                  height={xs ? 300 : 500}
                  width={xs ? 300 : 500}
                >
                  <FireFly></FireFly>
                  <img
                    style={{
                      height: xs ? 300 : 500,
                      width: xs ? 300 : 500,
                    }}
                    src={`${process.env.PUBLIC_URL}/images/plant-home.png`}
                  ></img>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Stack direction={"column"} width={"100%"} spacing={5}>
                <Box fontSize={20} fontWeight={500}>
                  สินค้าขายดี
                </Box>
                <Carousel position={savePositionCaurosel}>
                  {productReducer.products.map((product) => (
                    <ProductCard
                      handleClick={() => {
                        dispatch(
                          productIdActions.productIdAction(product?.id) as any
                        );
                        setOpenModal(true);
                        setSavePositionCaurosel(true);
                      }}
                      key={product.id}
                      price={product.price}
                      productName={product.name}
                      stock={product.stock}
                      image={product.image}
                    ></ProductCard>
                  ))}
                </Carousel>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  {bestSellerUsers.map((user, index) => (
                    <img
                      key={index}
                      style={{
                        height: 40,
                        width: 40,
                        position: "relative",
                        zIndex: user.zIndex,
                        left: user.left,
                      }}
                      src={user.image}
                    ></img>
                  ))}
                  <Box position={"relative"} left={-30}>
                    2000 คน ซื้อสินค้าขายดี
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          {/* category */}
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box fontSize={20} fontWeight={500} marginBottom={5}>
                หมวดหมู่
              </Box>
              <Grid container spacing={2}>
                {categories.map((category) => (
                  <Grid key={category.title} item xs={12} sm={4} md={4} lg={4}>
                    <CategoryCard
                      title={category.title}
                      image={category.image}
                      handleClick={() => {
                        navigate(`/shop?category=${category.category}`);
                      }}
                    ></CategoryCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box fontSize={20} fontWeight={500} marginBottom={5}>
                บทความ
              </Box>
              <Stack width={"100%"} direction={"column"} gap={3}>
                {articles.map((articles, index) => (
                  <ArticleCard
                    image={articles.image}
                    reply={articles.reply}
                    title={articles.title}
                    key={index}
                  ></ArticleCard>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Modal
            textConfirm="เพิ่มไปยังตระกร้า"
            role={ModalRoleEnum.confirm}
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setSavePositionCaurosel(false);
            }}
            onSubmit={async () => {
              const scrollPosition = window.scrollY;
              const scrollPositionX = window.scrollX;
              let body = {
                customer_id: loginReducer.authorization.customer.id,
                product_id: productIdReducer.product.id,
                quantity: quantity,
                price: productIdReducer.product.price,
              };
              await dispatch(orderActions.postOrders(body) as any);
              await dispatch(productActions.ProductAction() as any);
              window.scrollTo(scrollPositionX, scrollPosition);

              dispatch(
                cartActions.getCart(
                  loginReducer.authorization.customer.id
                ) as any
              );
            }}
          >
            <Stack direction={"column"} alignItems={"center"}>
              <Box fontSize={20} fontWeight={400}>
                {productIdReducer.product?.name}
              </Box>
              <img height={200} src={productIdReducer.product?.image}></img>
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
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
