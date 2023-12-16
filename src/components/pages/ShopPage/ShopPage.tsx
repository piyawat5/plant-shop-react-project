/* eslint-disable jsx-a11y/alt-text */
import { Box, Stack } from "@mui/material";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import ProductTypeDropdown from "../../features/ProductTypeDropdown";
import SearchFilter from "../../features/SearchFilter";
import SearchProductPrice from "../../features/SearchProductPrice";
import PageName from "../../features/PageName";
import usePagination from "../../features/Pagination";
import { Products } from "../HomePage/HomePage";
import ProductCard from "../../features/ProductCard";
import Modal from "../../features/Modal";
import { ModalRoleEnum } from "../../features/Modal/Modal";
import NumberEditor from "../../features/NumberEditor";

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

  //Pagination
  let [page, setPage] = React.useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  //scroll after next page
  const ref = React.useRef<null | HTMLDivElement>(null);

  //modal
  const [openModal, setOpenModal] = React.useState(false);

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
    <Box>
      {/* click paging then scroll top page */}
      <div ref={ref}></div>
      <PageName name="หน้าร้าน"></PageName>
      <Stack flexWrap={"wrap"} direction={"row"} gap={2} marginBottom={8}>
        SearchFilter
        <SearchFilter handleValue={setSearchProductName}></SearchFilter>
        <ProductTypeDropdown
          handleValue={setSearchProductType}
        ></ProductTypeDropdown>
        <SearchProductPrice
          handleValue={setSearchProductPrice}
        ></SearchProductPrice>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        {_DATA.currentData().map((product, index) => (
          <ProductCard
            key={index}
            handleClick={() => setOpenModal(true)}
            price={product.price}
            productName={product.productName}
            stock={product.stock}
            image={product.image}
          ></ProductCard>
        ))}
      </Stack>

      {/* <Grid container justifyContent={"center"} spacing={2} marginBottom={4}>
        {_DATA.currentData().map((product, index) => (
          <Grid item key={index}>
            <ProductCard
              handleClick={() => setOpenModal(true)}
              price={product.price}
              productName={product.productName}
              stock={product.stock}
              image={product.image}
            ></ProductCard>
          </Grid>
        ))}
      </Grid> */}
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
  );
};

export default ShopPage;
