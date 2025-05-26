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
  Autocomplete,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { addProduct, getProducts } from "../../services/productService";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";

export const Route = createFileRoute("/product/add")({
  component: ProductAdd,
});

type FormData = {
  name: string;
  price: number;
  location: string;
  note: string;
};

function ProductAdd() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [productNames, setProductNames] = useState<string[]>([]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedLocation(value);
    if (value !== "custom") {
      setCustomLocation("");
    }
  };

  useEffect(() => {
    getProducts(user?.uid || "").then((products) => {
      const uniqueProductNames = [...new Set(products.map((p: any) => p.name))];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProductNames(uniqueProductNames);
    });
  }, [user?.uid]);

  const onSubmit = handleSubmit((data: FormData) => handleAddProduct(data));

  const handleAddProduct = async (data: FormData) => {
    if (!data.name || !data.price) return alert("กรอกข้อมูลให้ครบ");

    await addProduct(
      user?.uid || "",
      data.name,
      Number(data.price),
      selectedLocation === "custom" ? customLocation : selectedLocation,
      data.note
    );

    setValue("name", "");
    setValue("price", 0);
    setValue("location", "");
    setSelectedLocation("");
    setCustomLocation("");
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
            <Controller
              name="name"
              control={control}
              rules={{ required: "ชื่อสินค้าไม่สามารถว่างได้" }}
              render={({ field }) => (
                <Autocomplete
                  freeSolo
                  options={productNames}
                  onInputChange={(_, value) => field.onChange(value)}
                  value={field.value || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="ชื่อสินค้า"
                      fullWidth
                      sx={{ mt: 2 }}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      autoComplete="off"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
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
              InputLabelProps={{
                shrink: true,
              }}
            />
            <RadioGroup
              value={selectedLocation}
              onChange={handleLocationChange}
            >
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
                value="TikTok"
                control={<Radio />}
                label="TikTok"
              />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="อื่น ๆ"
              />
            </RadioGroup>
            {selectedLocation === "custom" && (
              <TextField
                {...register("location", {
                  required: "กรุณากรอกช่องทางการซื้อ",
                })}
                label="ช่องทางการซื้อ"
                required
                fullWidth
                sx={{ mt: 2 }}
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                error={!!errors.location}
                helperText={errors.location?.message}
                autoComplete="off"
              />
            )}
            <TextField
              {...register("note")}
              label="บันทึกเพิ่มเติม"
              fullWidth
              multiline
              rows={4}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
