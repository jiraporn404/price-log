import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { MenuBar } from "../components/menuBar";
import { LoginPage } from "../components/loginPage";
import { useAuth } from "../contexts/authContext";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const { user } = useAuth();

  return (
    <MenuBar>
      <Box
        sx={{
          padding: 2,
          height: "calc(100% - 56px)",
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        {user ? (
          <Outlet />
        ) : (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={2}
          >
            <LoginPage />
          </Box>
        )}
      </Box>
    </MenuBar>
  );
}
