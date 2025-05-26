import { useState, useEffect } from "react";
import { addProduct, getProducts } from "./services/productService";
import { useAuth } from "./contexts/authContext";
import { Product } from "./interface";

export function PriceLogApp() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [note, setNote] = useState("");

  const loadProducts = async () => {
    const data = await getProducts(user?.uid || "");
    setProducts(data as Product[]);
  };

  const handleAddProduct = async () => {
    if (!name || price === "" || !location) return alert("กรอกข้อมูลให้ครบ");
    await addProduct(user?.uid || "", name, Number(price), location, note);
    setName("");
    setPrice("");
    setLocation("");
    setNote("");
    loadProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">📦 บันทึกราคาสินค้า</h1>

      <input
        type="text"
        placeholder="ชื่อสินค้า"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="ราคา"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="ซื้อที่ไหน"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white p-2 w-full"
      >
        ➕ เพิ่มสินค้า
      </button>

      <h2 className="text-lg font-bold mt-4">📜 รายการสินค้า</h2>
      <input
        type="text"
        placeholder="🔍 ค้นหาสินค้า..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <ul className="mt-2">
        {filteredProducts.map((product) => (
          <li key={product.id} className="border p-2 my-1">
            {product.name} - ฿{product.price} 🛒 {product.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
