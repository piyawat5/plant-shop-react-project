/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
type Props = {
  handleUrl: (url: string) => void;
};

function UploadImage({ handleUrl }: Props) {
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    // axios
    //   .post("https://tame-red-dhole-slip.cyclic.app/products/uploadImage", {
    //     image: base64,
    //   })
    //   .then((res) => {
    //     handleUrl(res.data);
    //     alert("image uploaded success");
    //   })
    //   .catch(console.log);
    handleUrl("testtest");
  };

  function UploadInput() {
    return (
      <input
        style={{ cursor: "pointer" }}
        onChange={(e) => {
          e.preventDefault();
          uploadImage(e);
        }}
        id="dropzone-file"
        type="file"
      ></input>
    );
  }

  return (
    <Box>
      <UploadInput></UploadInput>
    </Box>
  );
}

export default UploadImage;
