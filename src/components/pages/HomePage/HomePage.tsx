/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import ProductCard from "../../features/ProductCard";
import Carousel from "../../features/Carousel";
import { Box, Grid, Stack } from "@mui/material";
import CategoryCard from "../../features/CategoryCard";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../features/ArticleCard";

// type HomePageProps = {
//   //
// };
type Categories = {
  title: string;
  image: string;
};

type Products = {
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
  const navigate = useNavigate();
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
  return (
    <Box paddingX={"50px"}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        marginBottom={10}
      >
        <Box>
          <Box fontSize={24}>ยินดีต้อนรับ คุณ ปิยะวัตร พินทุสรศรี</Box>
          <img
            style={{ height: 500, width: 500 }}
            src={`${process.env.PUBLIC_URL}/images/plant-home.png`}
          ></img>
        </Box>
        <Stack direction={"column"} gap={4}>
          <Box fontSize={20} fontWeight={500}>
            สินค้าขายดี
          </Box>
          <Carousel>
            {products.map((product, index) => (
              <ProductCard
                key={index}
                price={product.price}
                productName={product.productName}
                stock={product.stock}
                image={product.image}
              ></ProductCard>
            ))}
          </Carousel>
          <Stack direction={"row"} alignItems={"center"} position={"relative"}>
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
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={8}
        alignItems={"flex-start"}
      >
        <Box>
          <Box fontSize={20} fontWeight={500} marginBottom={5}>
            หมวดหมู่
          </Box>
          <Grid width={"450px"} container spacing={2}>
            {categories.map((category) => (
              <Grid key={category.title} item sm={6} md={3} lg={4}>
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
        </Box>
        <Box>
          <Box fontSize={20} fontWeight={500} marginBottom={5}>
            บทความ
          </Box>
          <Stack direction={"column"} gap={3}>
            {articles.map((articles, index) => (
              <ArticleCard
                image={articles.image}
                reply={articles.reply}
                title={articles.title}
                key={index}
              ></ArticleCard>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
