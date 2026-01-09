import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const signupWithEmail = async ({ email, password, name }) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }

  return cred.user;
};

export const loginWithEmail = async ({ email, password }) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
