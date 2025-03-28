import { Button, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Homepage,
});

function Homepage() {
  const navigate = useNavigate();
  return (
    <Stack gap={2} height="100%">
      <Typography variant="h3" align="center">
        📦 Price Log
      </Typography>
      <Typography variant="subtitle1" align="center">
        PriceLog: A simple app for tracking and recording product prices,
        helping you keep track of your purchases and compare prices across
        different stores.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate({ to: "/product/list" })}
      >
        รายการสินค้า
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate({ to: "/product/add" })}
      >
        เพิ่มสินค้า
      </Button>
    </Stack>
  );
}
