"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const username = useAppSelector((state) => state.auth.username);

  console.log(username);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test task
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          {isLoggedIn && (
            <Button color="inherit" href="/table">
              Table
            </Button>
          )}
          {isLoggedIn && <p>Hello, {username}</p>}
          {isLoggedIn ? (
            <Button color="inherit" href="/" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
