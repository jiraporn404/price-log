import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// 📌 คอลเลกชันใน Firestore ที่ใช้เก็บสินค้า
const productCollection = collection(db, "products");

// 🟢 ฟังก์ชันเพิ่มข้อมูลสินค้า
export const addProduct = async (
  userId: string,
  name: string,
  price: number,
  location: string,
  note: string
) => {
  await addDoc(productCollection, {
    userId,
    name,
    price,
    location,
    date: new Date(),
    note,
  });
};

// 🔵 ฟังก์ชันดึงข้อมูลสินค้าทั้งหมด
export const getProducts = async (userId: string) => {
  const userProductsQuery = query(
    productCollection,
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(userProductsQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteProduct = async (id: string, userId: string) => {
  const productDoc = doc(productCollection, id);
  const snapshot = await getDoc(productDoc);

  if (snapshot.exists() && snapshot.data()?.userId === userId) {
    await deleteDoc(productDoc);
  } else {
    throw new Error("Unauthorized: You can only delete your own products.");
  }
};
