import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  price: number;
  location: string;
  date: Timestamp;
  note: string;
}
