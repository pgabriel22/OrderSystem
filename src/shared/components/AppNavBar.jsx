import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  IconButton,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Modal,
  TextField,
  Badge,
  Alert,
} from "@mui/material";
import OrderLogo from "../../assets/okb-logo.png";

const AppNavBar = ({
  setOpenDrawer,
  mode,
  setMode,
  authMode,
  setAuthMode,
  isModalOpen,
  setIsModalOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOrderingPage = location.pathname === "/order-create";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);

  const handleOpenModal = () => {
    setAuthMode("login"); // ✅ Reset to login form
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setError(null);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const userId = authData.user?.id;

    if (!userId) {
      setError("Signup succeeded but no user ID returned.");
      return;
    }

    const { error: profileError } = await supabase.from("users").insert([
      {
        id: userId,
        full_name: fullName,
        role: "customer", // default role
      },
    ]);

    if (profileError) {
      setError("Account creation failed: " + profileError.message);
      return;
    }

    // ✅ Auto-login after signup
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError("Auto-login failed: " + loginError.message);
      return;
    }

    // ✅ Fetch user role after login
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("role")
      .eq("id", loginData.user.id)
      .single();

    if (fetchError) {
      setError("Login profile fetch failed: " + fetchError.message);
      return;
    }

    const role = userData.role?.toLowerCase();
    setMode(role);
    localStorage.setItem("mode", role);
    localStorage.setItem("userId", loginData.user.id);
    handleCloseModal();

    // ✅ Redirect to role-based page
    if (role === "admin") {
      navigate("/admin-home");
    } else {
      navigate("/order-create");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // console.log("Login button clicked");

      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        // console.error("Login failed:", loginError.message);
        setError("Login failed: " + loginError.message);
        return;
      }

      const userId = authData.user?.id;
      // console.log("Auth user ID:", userId);

      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (!userData || profileError) {
        // console.error("Failed to load user profile:", profileError.message);
        setError(
          "Failed to load profile: " +
            (profileError?.message || "User not found")
        );
        return;
      }
      const role = userData.role?.toLowerCase();
      // console.log("Logged-in user role:", role);

      setMode(role);
      localStorage.setItem("mode", role);
      localStorage.setItem("userId", userId); // optional

      handleCloseModal();

      // console.log(
      //   "Will navigate to:",
      //   role === "admin" ? "/admin-home" : "/order-create"
      // );

      if (role === "admin") {
        navigate("/admin-home");
      } else {
        navigate("/order-create");
      }
    } catch (err) {
      // console.error("Unexpected error during login:", err);
      setError("Unexpected error: " + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("mode"); // or any other session values
    navigate("/"); // or your home/login page
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #ff5722 30%, #ff9800 90%)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo with conditional navigation */}
        <img
          src={OrderLogo}
          alt="Order Logo"
          style={{ height: "100px", cursor: "pointer" }}
          onClick={() => {
            if (mode === "admin") {
              navigate("/admin-home");
            } else {
              navigate("/");
            }
          }}
        />

        {/* Show login button only on homepage */}
        {location.pathname === "/" && (
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={handleOpenModal}
          >
            Login
          </Button>
        )}

        {/* Show logout on all other pages except order-create */}
        {location.pathname !== "/" && (
          <Button variant="text" sx={{ color: "white" }} onClick={handleLogout}>
            Logout
          </Button>
        )}

        {/* Login Modal */}
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            component="form"
            onSubmit={authMode === "login" ? handleLogin : handleSignUp}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              gap: 2,
            }}
          >
            <Typography variant="h6" textAlign="center">
              {authMode === "login" ? "Login" : "Sign Up"}
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {authMode === "signup" && (
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
              />
            )}

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            {authMode === "signup" && (
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
              />
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button type="submit" variant="contained">
                {authMode === "login" ? "Login" : "Sign Up"}
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>

            <Typography variant="body2" textAlign="center">
              {authMode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Button
                variant="text"
                onClick={() =>
                  setAuthMode(authMode === "login" ? "signup" : "login")
                }
              >
                {authMode === "login" ? "Sign Up" : "Login"}
              </Button>
            </Typography>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
