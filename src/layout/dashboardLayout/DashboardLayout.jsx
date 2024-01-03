import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/useDataContext/useDataContext";
import { useGetAccountContext } from "../../context/useGetAccount/useGetAccount";
import bucket from "../../appwrite/service/storage";

const drawerWidth = 240;

const DashboardLayout = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useDataContext();
  const { setIsAccount } = useGetAccountContext();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("users");
    navigate("/auth");
    setUserData(false);
    setIsAccount(false);
    console.log("Logged out");
  };

  const profileUrl = async () => {
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
  };
  useEffect(() => {
    profileUrl();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#FFA500" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            {openDrawer ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="User"
              src={
                userData.imageUrl ||
                "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288885.jpg"
              }
              sx={{ marginRight: "50px" }}
            />
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div style={{ width: drawerWidth }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
            }}
          >
            <Typography variant="h6" noWrap>
              Dashboard Menu
            </Typography>
            <IconButton
              onClick={handleDrawerClose}
              style={{ marginLeft: "auto" }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2em",
                }}
                to=""
              >
                {" "}
                Dashboard
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2em",
                }}
                to="profile"
              >
                {" "}
                Profile
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main
        style={{
          flexGrow: 1,
          padding: "64px 24px",
          marginLeft: openDrawer ? drawerWidth : 0,
        }}
      >
        <Toolbar />
        <Typography variant="h4" component="div">
          {" "}
          <Outlet />
        </Typography>
      </main>
    </div>
  );
};

export default DashboardLayout;
