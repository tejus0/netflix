import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../assets/bg/signin.svg";
import bgimg from "../assets/bg/backimg.jpg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
// import Snackbar from "@mui/material/Snackbar";
import toast from "react-hot-toast";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  TextField,
  InputAdornment,
//   FormControl,
//   InputLabel,
  IconButton,
  Button,
//   Input,
//   Checkbox,
  // Alert,
  Stack,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { loginUser } from "./Store/UserSlice";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

function Login() {
  const [employee_id, setEId] = useState("");
  const [password, setPass] = useState("");

  // export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // //Inputs
  const [emailInput, setEmailInput] = useState("");
  // const [passwordInput, setPasswordInput] = useState("");

  // // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // // Validation for onBlur Email
  const handleEmail = () => {
    // console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !password
      // ||
      // passwordInput.length < 5 ||
      // passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  // //handle Submittion
  const handleSubmit = async (e) => {
    setOpen(true);
    e.preventDefault();
    setSuccess(null);
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !password) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);
    setSuccess("Form Submitted Successfully");

    // Proceed to use the information passed
    // console.log("axios");
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, {
        employee_id: employee_id,
        email: emailInput,
        password: password,
      })
      .then((response) => {
        // response.json()
        console.log(response, "AdminData");
        if (response.data.status == "ok") {
          toast.success("Login Successful", { position: "top-right" });
          let userCredentials = { employee_id };
          dispatch(loginUser(userCredentials));
          window.localStorage.setItem("token", response.data.data);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("Id-data", JSON.stringify(employee_id));
          window.localStorage.setItem("user-type", response.data.type);
          if (response.data.type == "user") {
            window.location.href = "./user-page";
          } else {
            window.location.href = "./admin-page";
          }
        } else {
          alert(response.data.error);
        }
      })
      .then((response) => {
        axios.post(`http://localhost:7000/api/attendance`, {
          employee_id
        });
      })
      .catch((error) => console.log(error.message));

    // Show Successfull Submittion
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <div style={{ marginTop: "5px" }}>
                            <TextField
                              required
                              label="Employee ID"
                              fullWidth
                              id="standard-basic"
                              // variant="standard"
                              sx={{ width: "100%" }}
                              value={employee_id}
                              onChange={(e) => setEId(e.target.value)}
                              // InputProps={{}}
                              // size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <div style={{ marginTop: "5px" }}>
                            <TextField
                              label="Email Address"
                              fullWidth
                              error={emailError}
                              id="standard-basic"
                              // variant="standard"
                              sx={{ width: "100%" }}
                              value={emailInput}
                              // InputProps={{}}
                              // size="small"
                              onBlur={handleEmail}
                              autoComplete="email"
                              onChange={(event) => {
                                setEmailInput(event.target.value);
                              }}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            sx={{ width: "100%" }}
                            error={passwordError}
                            value={password}
                            label="Password"
                            name="password"
                            onBlur={handlePassword}
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            onChange={(event) => {
                              setPass(event.target.value);
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              onClick={() => {
                                navigate("/forget-pass");
                              }}
                              style={{ marginTop: "10px", cursor: "pointer" }}
                            >
                              Forgot password?
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Sign in
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Not registered yet?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/register");
                                }}
                              >
                                Create an Account
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
    // <Box
    //   container
    //   sx={{
    //     p: 15,
    //     m: "auto",
    //     marginTop:"3em",
    //     alignItems: "center",
    //     bgcolor:"grey",
    //     width: "40%",
    //     borderRadius: 5,
    //   }}
    // >
    //   <form onSubmit={handleSubmit} action="" method="">
    //     <div style={{ marginTop: "5px" }}>
    //       <TextField
    //         label="Employee ID"
    //         fullWidth
    //         id="standard-basic"
    //         variant="standard"
    //         sx={{ width: "100%" }}
    //         value={employee_id}
    //         onChange={(e) => setEId(e.target.value)}
    //         InputProps={{}}
    //         size="small"
    //       />
    //     </div>

    //     <div style={{ marginTop: "5px" }}>
    //       <TextField
    //         label="Email Address"
    //         fullWidth
    //         error={emailError}
    //         id="standard-basic"
    //         variant="standard"
    //         sx={{ width: "100%" }}
    //         value={emailInput}
    //         InputProps={{}}
    //         size="small"
    //         onBlur={handleEmail}
    //         onChange={(event) => {
    //           setEmailInput(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <div style={{ marginTop: "5px" }}>
    //       <FormControl sx={{ width: "100%" }} variant="standard">
    //         <InputLabel
    //           error={passwordError}
    //           htmlFor="standard-adornment-password"
    //         >
    //           Password
    //         </InputLabel>
    //         <Input
    //           error={passwordError}
    //           value={password}
    //           name="password"
    //           onBlur={handlePassword}
    //           id="standard-adornment-password"
    //           type={showPassword ? "text" : "password"}
    //           onChange={(event) => {
    //             setPass(event.target.value);
    //           }}
    //           endAdornment={
    //             <InputAdornment position="end">
    //               <IconButton
    //                 aria-label="toggle password visibility"
    //                 onClick={handleClickShowPassword}
    //                 onMouseDown={handleMouseDownPassword}
    //               >
    //                 {showPassword ? <VisibilityOff /> : <Visibility />}
    //               </IconButton>
    //             </InputAdornment>
    //           }
    //         />
    //       </FormControl>
    //     </div>

    //     <div style={{ marginTop: "10px" }}>
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         fullWidth
    //         startIcon={<LoginIcon />}
    //       >
    //         LOGIN
    //       </Button>
    //     </div>
    //   </form>

    //   <a href="/forget-pass">Forgot Password</a>

    //   <a href="/register">Register</a>
    // </Box>
  );
}

export default Login;
