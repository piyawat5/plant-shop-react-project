/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
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

// type HomePageProps = {
//   //
// };
type Categories = {
  title: string;
  image: string;
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
  const [openModal, setOpenModal] = React.useState(false);
  const categories: Categories[] = [
    {
      title: "ต้นไม้",
      image: `${process.env.PUBLIC_URL}/images/plant.png`,
    },
    {
      title: "ดิน & ปุ๋ย",
      image: `${process.env.PUBLIC_URL}/images/fertilizer.png`,
    },
    {
      title: "อุปกรณ์",
      image: `${process.env.PUBLIC_URL}/images/watering-can.png`,
    },
    {
      title: "ของตกแต่ง",
      image: `${process.env.PUBLIC_URL}/images/flamingo.png`,
    },
    {
      title: "ยา",
      image: `${process.env.PUBLIC_URL}/images/pesticide.png`,
    },
    {
      title: "เมล็ด",
      image: `${process.env.PUBLIC_URL}/images/seed.png`,
    },
  ];
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
  const [fetch, setFetch] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setFetch(false);
    }, 1000);
  }, []);

  return (
    <Box>
      {fetch ? (
        <Skeleton height={500}></Skeleton>
      ) : (
        <Box>
          <Grid alignItems={"center"} spacing={3} container marginBottom={5}>
            <Grid item textAlign={"center"} xs={12} sm={12} md={12} lg={6}>
              <Box fontSize={xs ? 20 : 24}>
                ยินดีต้อนรับ คุณ ปิยะวัตร พินทุสรศรี
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
                <Carousel>
                  {products.map((product, index) => (
                    <ProductCard
                      handleClick={() => {
                        setOpenModal(true);
                      }}
                      key={index}
                      price={product.price}
                      productName={product.productName}
                      stock={product.stock}
                      image={product.image}
                    ></ProductCard>
                  ))}
                </Carousel>
              </Stack>
            </Grid>
          </Grid>

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
                        navigate("/shop");
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
            }}
            onSubmit={() => {}}
          >
            <Stack direction={"column"} alignItems={"center"}>
              <Box fontSize={20} fontWeight={400}>
                ต้นหอมจริงๆ
              </Box>
              <img
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
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
