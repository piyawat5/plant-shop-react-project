import { Box, Grid, Stack } from "@mui/material";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import ProductTypeDropdown from "../../features/ProductTypeDropdown";
import SearchProductName from "../../features/SearchProductName";
import SearchProductPrice from "../../features/SearchProductPrice";
import PageName from "../../features/PageName";
import usePagination from "../../features/Pagination";
import { Products } from "../HomePage/HomePage";
import ProductCard from "../../features/ProductCard";

// type ShopPageProps = {
//   //
// };

const ShopPage: React.FC<any> = () => {
  const [searchProductName, setSearchProductName] = React.useState("");
  const [searchProductType, setSearchProductType] = React.useState("");
  const [searchProductPrice, setSearchProductPrice] = React.useState({});
  let data: Products[] = [
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
  const [products, setProducts] = React.useState(data);

  //Pagination
  let [page, setPage] = React.useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);
  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  //scroll after next page
  const ref = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    const searchCombind = {
      searchProductName,
      searchProductPrice,
      searchProductType,
    };
    if (Object.keys(searchCombind).length > 0) {
      console.log(searchProductName, searchProductType, searchProductPrice);
    }
  }, [searchProductName, searchProductType, searchProductPrice]);
  return (
    <Box paddingX={"50px"}>
      <div ref={ref}></div>
      <PageName name="หน้าร้าน"></PageName>
      <Stack direction={"row"} gap={2} marginBottom={4}>
        <SearchProductName
          handleValue={setSearchProductName}
        ></SearchProductName>
        <ProductTypeDropdown
          handleValue={setSearchProductType}
        ></ProductTypeDropdown>
        <SearchProductPrice
          handleValue={setSearchProductPrice}
        ></SearchProductPrice>
      </Stack>
      <Grid container spacing={2} columns={25} marginBottom={4}>
        {_DATA.currentData().map((product, index) => (
          <Grid item key={index} lg={5}>
            <ProductCard
              price={product.price}
              productName={product.productName}
              stock={product.stock}
              image={product.image}
            ></ProductCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
        <Pagination
          onClick={() => {
            ref.current?.scrollIntoView({ behavior: "smooth" }) as any;
          }}
          count={count}
          size="large"
          page={page}
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default ShopPage;
