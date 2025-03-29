import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { AddIcon, HomeIcon, ListIcon } from "../icons";
import { useAuth } from "../contexts/authContext";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100%)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export function MenuBar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const routeMatch = useMatchRoute();
  const navigate = useNavigate();
  const isHomeActive = routeMatch({ to: "/" });
  const isListProductActive = routeMatch({ to: "/product/list" });
  const isAddProductActive = routeMatch({ to: "/product/add" });
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPageTitle = () => {
    if (isHomeActive) return "Price Log";
    if (isListProductActive) return "รายการสินค้า";
    if (isAddProductActive) return "📝 เพิ่มสินค้า";
    return "Product Log";
  };

  React.useEffect(() => {
    if (isHomeActive) setValue(0);
    if (isListProductActive) setValue(1);
    if (isAddProductActive) setValue(2);
  }, [isHomeActive, isListProductActive, isAddProductActive]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography noWrap component="div">
              {getPageTitle()}
            </Typography>
          </Stack>
          {user && (
            <Avatar
              key={user?.photoURL}
              src={user?.photoURL || ""}
              onClick={handleAvatarClick}
              sx={{
                position: "absolute",
                right: 0,
                mr: 2,
              }}
            />
          )}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                logout();
                setAnchorEl(null);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          marginTop: "56px",
          width: "100vw",
          height: "calc(100vh - 56px)",
          overflow: "auto",
        }}
      >
        {children}
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            sx={{ borderTop: "1px solid #e0e0e0" }}
          >
            <BottomNavigationAction
              label="หน้าหลัก"
              icon={<HomeIcon />}
              onClick={() => navigate({ to: "/" })}
            />
            <BottomNavigationAction
              label="รายการสินค้า"
              icon={<ListIcon />}
              onClick={() => navigate({ to: "/product/list" })}
            />
            <BottomNavigationAction
              label="เพิ่มสินค้า"
              icon={<AddIcon />}
              onClick={() => navigate({ to: "/product/add" })}
            />
          </BottomNavigation>
        </Box>
      </Box>
    </Box>
  );
}
