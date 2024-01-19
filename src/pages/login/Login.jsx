import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  styled,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../appwrite/service/authentication";
import { useDataContext } from "../../context/useDataContext/useDataContext";

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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { userData, setUserData } = useDataContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password.length < 9) {
      setPasswordError("Password must be at least 9 characters");
      return;
    }
    setPasswordError("");

    setLoading(true); // for loader uses
    const getUserData = await auth.loginWithEmailAndPassword({ ...formData });

    if (getUserData?.flag === false) {
      toast.error(`${getUserData.message}`, tostConf);
    } else {
      localStorage.setItem("users", JSON.stringify(getUserData));
      setUserData(getUserData);
    }
    console.log("Login Page alvish opererator section : ", getUserData?.nuli);

    setLoading(false);
  };

  return (
    <RootContainer component="main" maxWidth="xs">
      <ToastContainer />
      <div>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <FormContainer onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
            <Grid item xs={12} style={{ textAlign: "right" }}>
              {" "}
              <Link
                to="/auth/passwordrecovery"
                variant="body2"
                style={{ textDecoration: "none", fontFamily: "Helvetica" }}
              >
                Forgot password?
              </Link>{" "}
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
            Log In
          </SubmitButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {" "}
              <Link
                to="/auth"
                variant="body2"
                style={{ textDecoration: "none", fontFamily: "Helvetica" }}
              >
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </FormContainer>
      </div>
    </RootContainer>
  );
};

export default Login;
