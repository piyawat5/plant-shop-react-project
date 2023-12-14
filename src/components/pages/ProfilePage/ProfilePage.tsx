/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useNavigate } from "react-router-dom";

// type ProfilePageProps = {
//   //
// };

const ProfilePage: React.FC<any> = () => {
  const navigate = useNavigate();
  return (
    <Box paddingX={"50px"}>
      <PageName name="โปรไฟล์"></PageName>
      <Stack
        position={"relative"}
        p={4}
        pt={15}
        mt={20}
        borderRadius={4}
        bgcolor={"white"}
        sx={{ minWidth: 275 }}
        direction={"column"}
        justifyContent={"center"}
        spacing={2}
      >
        <Box sx={{ position: "absolute", bottom: 180, top: -100 }}>
          <img
            style={{ outline: "12px solid #EFEFEF", borderRadius: 100 }}
            height={200}
            width={200}
            src={`${process.env.PUBLIC_URL}/images/avatar.png`}
          ></img>
        </Box>
        <Typography>ปิยะวัตร พินทุสรศรี</Typography>
        <Typography>Email: xxxxxx@hotmail.com</Typography>
        <Button
          onClick={() => {
            navigate("/edit-profile");
          }}
          sx={{ color: "white" }}
          variant="contained"
        >
          แก้ไขโปรไฟล์
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
