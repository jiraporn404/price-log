import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { addProduct } from "../../services/productService";
import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

export const Route = createFileRoute("/product/add")({
  component: ProductAdd,
});

type FormData = {
  name: string;
  price: number;
  location: string;
};

function ProductAdd() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [location, setLocation] = useState("");
  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocation(value);
    if (value === "custom") {
      setIsCustomLocation(true);
    } else {
      setIsCustomLocation(false);
    }
  };

  const onSubmit = handleSubmit((data: FormData) => handleAddProduct(data));

  const handleAddProduct = async (data: FormData) => {
    if (!data.name || !data.price) return alert("กรอกข้อมูลให้ครบ");
    await addProduct(
      user?.uid || "",
      data.name,
      Number(data.price),
      isCustomLocation ? data.location : location
    );
    setValue("name", "");
    setValue("price", 0);
    setValue("location", "");
    setLocation("");
    setIsCustomLocation(false);
    setOpen(true);
    navigate({ to: "/product/list" });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📝 เพิ่มสินค้า
      </Typography>
      <Divider />
      <Box sx={{ width: "100%", mt: 2 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              {...register("name", { required: "ชื่อสินค้าไม่สามารถว่างได้" })}
              label="ชื่อสินค้า"
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.name}
              helperText={errors.name?.message}
              autoComplete="off"
              required
            />
            <TextField
              {...register("price", { required: "ราคาไม่สามารถว่างได้" })}
              type="number"
              label="ราคา"
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.price}
              helperText={errors.price?.message}
              autoComplete="off"
              required
            />
            <RadioGroup value={location} onChange={handleLocationChange}>
              <FormControlLabel
                value="Shopee"
                control={<Radio />}
                label="Shopee"
              />
              <FormControlLabel
                value="Lazada"
                control={<Radio />}
                label="Lazada"
              />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="อื่น ๆ"
              />
            </RadioGroup>
            {isCustomLocation && (
              <TextField
                {...register("location", {
                  required: "กรุณากรอกช่องทางการซื้อ",
                })}
                label="ช่องทางการซื้อ"
                required={isCustomLocation}
                fullWidth
                sx={{ mt: 2 }}
                value={location === "custom" ? "" : location}
                onChange={(e) => setLocation(e.target.value)}
                error={!!errors.location}
                helperText={errors.location?.message}
                autoComplete="off"
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              เพิ่มสินค้า
            </Button>
          </Stack>
        </form>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={() => setOpen(false)}
        message="เพิ่มสินค้าสำเร็จ"
        key="topright"
        autoHideDuration={3000}
      />
    </Box>
  );
}
