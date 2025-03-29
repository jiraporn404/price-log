import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Product } from "../../interface";
import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/productService";
import { MoreVert, Search } from "@mui/icons-material";
import { useAuth } from "../../contexts/authContext";

export const Route = createFileRoute("/product/list")({
  component: ProductList,
});

function ProductList() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts(user?.uid || "");
    setProducts(data as Product[]);
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId, user?.uid || "");
    loadProducts();
    setAnchorEl(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📜 รายการสินค้า
      </Typography>
      <Divider />
      {products.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          ไม่มีข้อมูลสินค้า
        </Typography>
      )}
      {products.length > 0 && (
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />
      )}
      {filteredProducts.map((product) => {
        return (
          <Box
            key={product.id}
            sx={{
              py: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Stack
              direction={"row"}
              width={"100%"}
              alignItems={"center"}
              spacing={1}
            >
              <Box flexGrow={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    fontWeight={500}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                      maxWidth: isMobile ? "300px" : "100%",
                    }}
                  >
                    {product.name}
                  </Typography>
                </Stack>
                <Typography
                  fontWeight={600}
                  align="right"
                  sx={{ color: "#f67e7d" }}
                >
                  ฿
                  {product.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    {product.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.date.toDate().toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Typography>
                </Stack>
              </Box>

              <IconButton
                color="inherit"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleDelete(product.id)}>
                  Delete
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
