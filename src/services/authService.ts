import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("uid", user.uid);
    localStorage.setItem("email", user.email || "");
    console.log("User logged in:", user);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("Error logging in: ", error.message);
    } else {
      console.error("Error logging in: ", error);
    }
  }
};

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("uid", user.uid);
    localStorage.setItem("email", user.email || "");
    console.log("User registered: ", userCredential.user);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("Error registering: ", error.message);
    } else {
      console.error("Error registering: ", error);
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out!");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("Error logging out: ", error.message);
    } else {
      console.error("Error logging out: ", error);
    }
  }
};
