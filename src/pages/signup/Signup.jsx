import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  styled,
  CircularProgress,
} from "@mui/material";
import auth from "../../appwrite/service/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const FormContainer = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Signup = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password.length < 9) {
      setPasswordError("Password must be at least 9 characters");

      return;
    }
    setPasswordError("");

    // console.log(formData); // use for shoow Sigup form data
    setFormData({ username: "", email: "", password: "" });

    // send data to appwrite
    setLoading(true); // for loader uses
    const accountFlag = await auth.createAccount({
      ...formData,
    });
    setLoading(false); // for loader uses

    // set data to redux store
    if (accountFlag.flag === false) {
      toast.error(`${accountFlag.message}`, {
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
      console.log(accountFlag);
      navigate("/auth/login");
    }
  };

  return (
    <RootContainer component="main" maxWidth="xs">
      <ToastContainer />
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <FormContainer onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                error={!!passwordError}
                helperText={passwordError}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading} // Disable button while loading
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            Sign Up
          </SubmitButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/auth/login"
                variant="body2"
                style={{ textDecoration: "none", fontFamily: "Helvetica" }}
              >
                You have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </FormContainer>
      </div>
    </RootContainer>
  );
};

export default Signup;
