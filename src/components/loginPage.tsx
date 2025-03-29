import { Box, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../contexts/authContext";

export function LoginPage() {
  const { login } = useAuth();

  return (
    <Box sx={{ width: "100%" }}>
      <Stack justifyContent="center" alignItems="center" gap={2}>
        <Typography variant="h6">Sign in to your account</Typography>
        <Button variant="contained" onClick={login}>
          Sign in with Google
        </Button>
      </Stack>
    </Box>
  );
}
