import React, { type JSX } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, clearAuth } from "../../helpers/auth";
import "./Navbar.css";

interface NavItem {
  label: string;
  path: string;
}

export default function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userIsAuthenticated = isAuthenticated();

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleProfileClick = (): void => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogoutClick = (): void => {
    clearAuth();
    navigate("/");
    handleMenuClose();
  };

  const navItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "History", path: "/history" },
    { label: "Settings", path: "/settings" },
  ];

  const publicPages = ["/", "/login", "/register"];
  const showProtectedNav =
    userIsAuthenticated && !publicPages.includes(location.pathname);

  return (
    <AppBar position="sticky" id="navbar-appbar">
      <Toolbar id="navbar-toolbar" sx={{ px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            id="navbar-title"
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "inherit",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            🥬 Verdura
          </Typography>
        </Box>

        {showProtectedNav && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: 1,
            }}
          >
            {navItems.map((item, index) => (
              <Box
                key={item.path}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255, 255, 255, 0.15)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
                {index < navItems.length - 1 && (
                  <Typography
                    sx={{ color: "rgba(255, 255, 255, 0.7)", mx: 0.5 }}
                  >
                    |
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {!showProtectedNav && <Box sx={{ flexGrow: 1 }} />}

        {showProtectedNav && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {/* Three horizontal lines (hamburger menu) */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.3,
                  width: 20,
                  height: 16,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 2,
                    backgroundColor: "currentColor",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    height: 2,
                    backgroundColor: "currentColor",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    height: 2,
                    backgroundColor: "currentColor",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </IconButton>

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "profile-button",
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              sx={{
                "& .MuiPaper-root": {
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  minWidth: 140,
                },
              }}
            >
              <MenuItem
                onClick={handleProfileClick}
                sx={{
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                }}
              >
                👤 Profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogoutClick}
                sx={{
                  py: 1.5,
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                  },
                }}
              >
                🚪 Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
