import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { MenuBar } from "../components/menuBar";

export const Route = createRootRoute({
  component: () => (
    <MenuBar>
      <Box
        sx={{
          padding: 2,
          height: "calc(100% - 56px)",
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        <Outlet />
      </Box>
    </MenuBar>
  ),
});
