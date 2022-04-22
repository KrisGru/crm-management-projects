import { AppContext } from "../../utils/contextState";
import fetcher from "../../utils/fetcher";
import { useState, useContext } from "react";
import { Prisma } from "@prisma/client";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { FacebookProvider, LoginButton } from "react-facebook";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  TextField,
  Box,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";

//roles in register form
const options = [
  { key: "d", text: "DEVELOPER", value: "DEVELOPER" },
  { key: "c", text: "CLIENT", value: "CLIENT" },
];

export default function EntryForms() {
  const [changeForm, setChangeForm] = useState(false);
  //global States
  const [user, setUser] = useState(null);
  const getDate = useContext(AppContext);
  //login states
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  //register states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleFetcher = () => {};

  const handleSelectInput = (event) => {
    setRole(event.target.value);
  };

  function handleResponse(data) {
    console.log(data);
  }

  const handleError = (error) => {
    console.log({ error });
  };

  return (
    <div
      className={
        changeForm
          ? "form-container form-container__expanded"
          : "form-container"
      }
    >
      {/*login form */}
      <Box
        component="form"
        className={changeForm ? "form-off" : "form-on loginForm"}
        sx={{ "& > :not(style)": { my: 1 } }}
        onSubmit={(e) => {
          e.preventDefault();
          const body = {
            email: emailLogin,
            password: passwordLogin,
          };
          fetcher("/api/signIn", body);
          setPasswordLogin("");
          setEmailLogin("");
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
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
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
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
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
          <LoginButton
            scope="email"
            onCompleted={handleResponse}
            onError={handleError}
          >
            <span className="facebookIcon">
              <FacebookIcon fontSize="medium" />
              Login by Facebook
            </span>
          </LoginButton>
        </FacebookProvider>
      </Box>
      {/*register form */}
      <Box
        component="form"
        className={changeForm ? "form-on" : "form-off"}
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        onSubmit={(e) => {
          e.preventDefault();
          const body: Prisma.UserCreateInput = {
            firstName,
            lastName,
            role,
            email,
            avatar,
            password,
          };
          fetcher("/api/create", body);
          setFirstName("");
          setLastName("");
          setEmail("");
          setAvatar("");
          setRole(null);
        }}
      >
        <h1>
          Sign up for free and experience{" "}
          <span style={{ color: "#248f47" }}>In Point</span> today
        </h1>
        <TextField
          size="small"
          required
          id="outlined-firstName-input"
          color="success"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          size="small"
          required
          id="outlined-lastName-input"
          color="success"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          size="small"
          required
          id="outlined-emailRegister-input"
          color="success"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          size="small"
          required
          id="outlined-passwordRegister-input"
          color="success"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <TextField
          size="small"
          id="avatar"
          color="success"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          label="Avatar"
          type="input"
        />
        <TextField
          size="small"
          select
          required
          label="Select"
          color="success"
          value={role}
          onChange={handleSelectInput}
          helperText="Please select your currency"
        >
          {options.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
        <div>
          <Button
            variant="contained"
            className="containedButton"
            type="submit"
            size="medium"
          >
            Create free account
          </Button>
        </div>
      </Box>
      {/*bottom of forms - Form Change Area */}
      <section className="formChangeArea">
        {changeForm ? <p>Have account?</p> : <p>New to In Point?</p>}
        <Button
          onClick={() => setChangeForm(!changeForm)}
          variant="outlined"
          color="success"
          type="submit"
          size="small"
        >
          {changeForm ? "Log In" : "Sign Up"}
        </Button>
      </section>
    </div>
  );
}
