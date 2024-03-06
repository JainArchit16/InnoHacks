import { db } from "./config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
export const setDb = async (data) => {
  const docRef = await addDoc(collection(db, "products"), data);
  console.log(docRef);
  const q = query(
    collection(db, "Sellers"),
    where("seller_name", "==", data.seller_name)
  );

  // Execute the query
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    // Get the first document from the query result
    const docRef1 = await addDoc(collection(db, "Sellers"), {
      seller_name: data.seller_name,
      count: 0,
    });
    console.log(docRef1);
  }
};
