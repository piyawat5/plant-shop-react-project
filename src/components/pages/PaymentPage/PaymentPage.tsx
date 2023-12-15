import { Box, Button, Stack, Tab, Tabs, useTheme } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/UploadImage";

// type PaymentPageProps = {
//   //
// };

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PaymentPage: React.FC<any> = () => {
  const navigate = useNavigate();

  //Tab value
  const [value, setValue] = React.useState(0);

  //MUI Theme
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <PageName name="การชำระเงิน"></PageName>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ mx: 3, px: 3 }} label="เลขบัญชี" {...a11yProps(0)} />
          <Tab
            sx={{ mx: 3, px: 3 }}
            label="สแกนคิวอาร์โค้ด"
            {...a11yProps(1)}
          />
          <Tab sx={{ mx: 3, px: 3 }} label="Promptpay" {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Stack
            spacing={5}
            p={"24px"}
            width={"100%"}
            maxWidth={342}
            bgcolor={"white"}
            boxShadow={2}
            borderRadius={"4"}
          >
            <Box
              onClick={() => {
                navigate("/order-detail");
              }}
              sx={{ cursor: "pointer" }}
              color={theme.palette.primary.main}
              borderBottom={`1px solid ${theme.palette.primary.main}`}
            >
              ตรวจสอบรายละเอียดสินค้าก่อนโอนเงิน *
            </Box>
            <Stack textAlign={"center"} spacing={1}>
              <Box>ธนาคาร xxxxxxxxxxxxx</Box>
              <Box>เลขบัญชี xxxxxxxxxxxxx</Box>
              <Box>นาย ปิยะวัตร พินทุสรศรี</Box>
              <Box fontWeight={400} my={2}>
                จำนวนเงินทั้งหมด: 1500 บาท
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Box>กรุณาอัพโหลด สลิปการโอนเงิน *</Box>
              <UploadImage handleUrl={() => {}}></UploadImage>
            </Stack>
            <Stack spacing={1}>
              <Button
                onClick={() => {
                  navigate("/my-order");
                }}
                sx={{ color: "white" }}
                variant="contained"
              >
                ยืนยันการโอนเงิน
              </Button>
              <Button
                onClick={() => {
                  navigate("/cart");
                }}
                variant="outlined"
              >
                ยกเลิกรายการ
              </Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack
            spacing={5}
            p={"24px"}
            width={"100%"}
            maxWidth={342}
            bgcolor={"white"}
            boxShadow={2}
            borderRadius={"4"}
          >
            <Box
              onClick={() => {
                navigate("/order-detail");
              }}
              sx={{ cursor: "pointer" }}
              color={theme.palette.primary.main}
              borderBottom={`1px solid ${theme.palette.primary.main}`}
            >
              ตรวจสอบรายละเอียดสินค้าก่อนโอนเงิน *
            </Box>
            <Stack spacing={1} textAlign={"center"}>
              <Box>นาย ปิยะวัตร พินทุสรศรี</Box>
              <Box textAlign={"center"}>
                <img
                  alt="QR-code mobile banking"
                  height={200}
                  width={168}
                  src={`${process.env.PUBLIC_URL}/images/My_Facebook_Code.png`}
                ></img>
              </Box>
              <Box fontWeight={400} my={2}>
                จำนวนเงินทั้งหมด: 1500 บาท
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Box>กรุณาอัพโหลด สลิปการโอนเงิน *</Box>
              <UploadImage handleUrl={() => {}}></UploadImage>
            </Stack>
            <Stack spacing={1}>
              <Button
                onClick={() => {
                  navigate("/my-order");
                }}
                sx={{ color: "white" }}
                variant="contained"
              >
                ยืนยันการโอนเงิน
              </Button>
              <Button onClick={() => {}} variant="outlined">
                ยกเลิกรายการ
              </Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Stack
            spacing={5}
            p={"24px"}
            width={"100%"}
            maxWidth={342}
            bgcolor={"white"}
            boxShadow={2}
            borderRadius={"4"}
          >
            <Box
              onClick={() => {
                navigate("/order-detail");
              }}
              sx={{ cursor: "pointer" }}
              color={theme.palette.primary.main}
              borderBottom={`1px solid ${theme.palette.primary.main}`}
            >
              ตรวจสอบรายละเอียดสินค้าก่อนโอนเงิน *
            </Box>
            <Stack spacing={1} textAlign={"center"}>
              <Box>เบอร์ xxx-xxx-xxxx</Box>
              <Box>นาย ปิยะวัตร พินทุสรศรี</Box>
              <Box fontWeight={400} my={2}>
                จำนวนเงินทั้งหมด: 1500 บาท
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Box>กรุณาอัพโหลด สลิปการโอนเงิน *</Box>
              <UploadImage handleUrl={() => {}}></UploadImage>
            </Stack>
            <Stack spacing={1}>
              <Button
                onClick={() => {
                  navigate("/my-order");
                }}
                sx={{ color: "white" }}
                variant="contained"
              >
                ยืนยันการโอนเงิน
              </Button>
              <Button
                onClick={() => {
                  navigate("/cart");
                }}
                variant="outlined"
              >
                ยกเลิกรายการ
              </Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default PaymentPage;
