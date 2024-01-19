import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import auth from "../../appwrite/service/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const url = window.location.href;
  const urlParams = new URLSearchParams(url.split("?")[1]); // Extract query parameters
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const tostConf = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      // Passwords match, perform further actions (e.g., submit the form)
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
    }

    const getData = await auth.updateRecoveryPass({
      userId,
      secret,
      password,
      confirmPassword,
    });
    console.log(getData);
    if (getData?.flag == false) {
      toast.error(`${getData.message}`, tostConf);
    } else {
      toast.success(`congratulations!!! password updated `, tostConf);
      
      navigate("/auth/login");
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordError !== ""}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PasswordForm;
