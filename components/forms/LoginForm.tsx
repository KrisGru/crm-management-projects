import { AppContext } from "../../utils/contextState";
import { useState, useContext } from "react";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { FacebookProvider, LoginButton } from "react-facebook";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField, Box, Button, InputAdornment } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();
  //global state
  const { setUser } = useContext(AppContext);
  //login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getUser(urlApi, body) {
    const user = await handleFetcher(urlApi, body);
    await setUser(user);
    router.push("/dashboard");
  }

  function handleFetcher(urlApi, body) {
    return new Promise((resolve) => {
      console.log("loading.... ");
      const response = fetcher(urlApi, body);
      resolve(response);
    });
  }

  return (
    <Box
      component="form"
      className="loginForm"
      sx={{ "& > :not(style)": { my: 1 } }}
      onSubmit={(e) => {
        e.preventDefault();
        const body = {
          email,
          password,
        };
        getUser("/api/login", body);
        setPassword("");
        setEmail("");
      }}
    >
      <h1>Log in to your account</h1>
      <TextField
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        size="small"
        id="outlined-email-input Login"
        color="success"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        required
        size="small"
        id="outlined-password-input logIn"
        color="success"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        sx={{
          marginBottom: "0px",
        }}
      />
      <div>
        <p className="forgotPasswordText">Forgot your password?</p>
        <Button
          variant="contained"
          color="success"
          sx={{ backgroundColor: "#248f47" }}
          type="submit"
          size="medium"
        >
          Log In
        </Button>
      </div>
      <FacebookProvider appId="123456789">
        <LoginButton scope="email">
          <span className="facebookIcon">
            <FacebookIcon fontSize="medium" />
            Login by Facebook
          </span>
        </LoginButton>
      </FacebookProvider>
    </Box>
  );
}
