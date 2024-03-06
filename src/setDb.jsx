import { db } from "./config/firebase";
import { addDoc, collection } from "firebase/firestore";
export const setDb = async (data) => {
  const docRef = await addDoc(collection(db, "products"), data);
  console.log(docRef);
};
