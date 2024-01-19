import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../appwrite/service/authentication";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoding(true);
    const linkFlag = await auth.passwordRecoverySend({ email });

    if (linkFlag?.flag == false) {
      toast.error(`${linkFlag.message}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(`congratulations!!! password reset link was send `, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/auth/newpassword");
    }
    setIsLoding(false);
    console.log(linkFlag);
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                required
                variant="outlined"
                fullWidth
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={
                  isLoading && <CircularProgress size={20} color="inherit" />
                }
              >
                Send Reset Link
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container sx={{ marginTop: "30px" }} justifyContent="center">
          <Grid item>
            <Link
              to="/auth/login"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "20px",
                fontFamily: "inherit",
              }}
              variant="body2"
            >
              <Typography component="h1" variant="h6">
                Back to Login
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ForgotPassword;
