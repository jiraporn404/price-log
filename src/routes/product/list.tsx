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
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Product } from "../../interface";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/productService";
import { MoreVert, Search } from "@mui/icons-material";
import { useAuth } from "../../contexts/authContext";

const locationStyle = [
  {
    location: "Shopee",
    color: "rgb(255, 145, 0)",
  },
  {
    location: "Lazada",
    color: "rgb(88, 88, 240)",
  },
];
export const Route = createFileRoute("/product/list")({
  component: ProductList,
});

function ProductList() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuState, setMenuState] = useState<{
    anchorEl: HTMLElement | null;
    productId: string | null;
  }>({ anchorEl: null, productId: null });
  const open = Boolean(menuState.anchorEl);
  // const isMobile = useMediaQuery("(max-width: 600px)");

  const loadProducts = async () => {
    const data = await getProducts(user?.uid || "");
    setProducts(data as Product[]);
  };

  const handleDelete = async () => {
    if (!menuState.productId) return;
    await deleteProduct(menuState.productId, user?.uid || "");
    loadProducts();
    setMenuState({ anchorEl: null, productId: null });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProducts = filteredProducts.reduce(
    (acc, product) => {
      if (!acc[product.name]) {
        acc[product.name] = [];
      }
      acc[product.name].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  useEffect(() => {
    loadProducts();
  }, []);

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
          autoComplete="off"
        />
      )}

      {Object.entries(groupedProducts)
        .sort(([aName], [bName]) => aName.localeCompare(bName))
        .map(([name, group]) => (
          <Box key={name} sx={{ mb: 1 }}>
            <Typography fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
              {name}
              {group.length > 1 && (
                <span style={{ color: "#888" }}> ({group.length})</span>
              )}
            </Typography>
            {group
              .sort((aPrice, bPrice) => aPrice.price - bPrice.price)
              .map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    mb: 1.5,
                    p: 1,
                    background: "#fafbfc",
                    borderRadius: 2,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    border: "1px solid #ececec",
                    transition: "background 0.2s",
                    "&:hover": {
                      background: "#f5f7fa",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Box flexGrow={1}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          fontWeight={600}
                          color="#f67e7d"
                          fontSize={18}
                          sx={{ minWidth: 90 }}
                        >
                          ฿
                          {product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            ml: 2,
                            fontStyle: "italic",
                            color: locationStyle.find(
                              (l) => l.location === product.location
                            )?.color,
                          }}
                        >
                          {product.location}
                        </Typography>
                      </Stack>
                      {product.note && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5, fontStyle: "italic" }}
                        >
                          📝 {product.note}
                        </Typography>
                      )}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Typography fontSize={12} color="text.secondary">
                          วันที่:{" "}
                          <span style={{ fontWeight: 500 }}>
                            {product.date.toDate().toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </span>
                        </Typography>
                      </Stack>
                    </Box>
                    <IconButton
                      color="inherit"
                      onClick={(event) =>
                        setMenuState({
                          anchorEl: event.currentTarget,
                          productId: product.id,
                        })
                      }
                      sx={{ ml: 1 }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
            <Menu
              anchorEl={menuState.anchorEl}
              open={open}
              onClose={() => setMenuState({ anchorEl: null, productId: null })}
            >
              <MenuItem onClick={handleDelete}>ลบสินค้า</MenuItem>
            </Menu>
          </Box>
        ))}
    </Box>
  );
}
