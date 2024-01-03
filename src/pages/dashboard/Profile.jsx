import React, { useState } from "react";
import { Button } from "@mui/material";
import bucket from "../../appwrite/service/storage";
import { UploadFile } from "@mui/icons-material";
import { useDataContext } from "../../context/useDataContext/useDataContext.js";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userData, setUserData } = useDataContext();

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    } else {
      console.log(selectedImage);
      const uploadImage = await bucket.createFile({ file: selectedImage });
      console.log(uploadImage);
      if (UploadFile.flag === false) {
      } else {
        const filesArray = await bucket.listAllFiles();
        console.log(filesArray);
        let len = filesArray.files.length - 1;
        const newPicUrl = await bucket.getOneFile({
          fileId: filesArray.files[len].$id,
        });
        if (newPicUrl) {
          setUserData({ ...userData, imageUrl: newPicUrl });
          console.log(userData);
        }
        console.dir("url" + newPicUrl);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <Button variant="outlined" component="span">
          Select Image
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleImageUpload}
        disabled={!selectedImage}
      >
        Upload Image to Appwrite
      </Button>
    </div>
  );
};

export default Profile;
