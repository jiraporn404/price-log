import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// 📌 คอลเลกชันใน Firestore ที่ใช้เก็บสินค้า
const productCollection = collection(db, "products");

// 🟢 ฟังก์ชันเพิ่มข้อมูลสินค้า
export const addProduct = async (
  name: string,
  price: number,
  location: string
) => {
  await addDoc(productCollection, { name, price, location, date: new Date() });
};

// 🔵 ฟังก์ชันดึงข้อมูลสินค้าทั้งหมด
export const getProducts = async () => {
  const snapshot = await getDocs(productCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
