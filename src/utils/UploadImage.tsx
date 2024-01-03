/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { Box } from "@mui/material";
import { domain } from "./const";
import * as uploadActions from "../redux/actions/upload.action";
import { useAppDispatch } from "..";
import { useSelector } from "react-redux";
import { RootReducers } from "../redux/reducers";

type Props = {
  handleUrl: (url: string) => void;
};

function UploadImage({ handleUrl }: Props) {
  const dispatch = useAppDispatch();
  const uploadReducer = useSelector(
    (state: RootReducers) => state.uploadReducer
  );
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
    dispatch(uploadActions.uploadIsFetching());
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    const token = localStorage.getItem("TOKEN");
    await axios
      .post(
        `${domain}/uploadImage`,
        {
          image: base64,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleUrl(res.data);
        dispatch(uploadActions.uploadIsSuccess());
        alert("image uploaded success");
      })
      .catch((err) => {
        console.log(err);
        dispatch(uploadActions.uploadIsFail());
      });
  };

  function UploadInput() {
    return (
      <input
        style={{ cursor: "pointer" }}
        disabled={uploadReducer.isFetching}
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
