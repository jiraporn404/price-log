import { useState, useEffect } from "react";
import { addProduct, getProducts } from "./services/productService";

export function PriceLogApp() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    console.log("loadProducts");
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!name || price === "" || !location) return alert("กรอกข้อมูลให้ครบ");
    await addProduct(name, Number(price), location);
    setName("");
    setPrice("");
    setLocation("");
    loadProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">📦 บันทึกราคาสินค้า</h1>

      {/* ฟอร์มกรอกข้อมูล */}
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

      {/* แสดงรายการสินค้า */}
      <h2 className="text-lg font-bold mt-4">📜 รายการสินค้า</h2>
      <input
        type="text"
        placeholder="🔍 ค้นหาสินค้า..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <ul className="mt-2">
        {products.map((product) => (
          <li key={product.id} className="border p-2 my-1">
            {product.name} - ฿{product.price} 🛒 {product.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
