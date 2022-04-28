import { AppContext } from "../../utils/contextState";
import fetcher from "../../utils/fetcher";
import { useState, useContext } from "react";
import { Prisma } from "@prisma/client";
import { TextField, Box, Button, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

//roles in register form
const options = [
  { key: "d", text: "DEVELOPER", value: "DEVELOPER" },
  { key: "c", text: "CLIENT", value: "CLIENT" },
];

export default function RegisterForm() {
  //global state
  const { setUser } = useContext(AppContext);
  //register states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  async function getUser(urlApi, body) {
    const user = await handleFetcher(urlApi, body);
    await setUser(user);
    router.push("/dashboard");
  }

  function handleFetcher(urlApi, body) {
    return new Promise((resolve, reject) => {
      console.log("loading.... ");
      const response = fetcher(urlApi, body);
      resolve(response);
    });
  }

  const handleSelectInput = (event) => {
    setRole(event.target.value);
  };

  return (
    <Box
      component="form"
      className="form-on"
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
        getUser("/api/create", body);
        setFirstName("");
        setLastName("");
        setEmail("");
        setAvatar("");
        setPassword("");
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
  );
}
