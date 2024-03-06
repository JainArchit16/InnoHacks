import { setDb } from "./setDb";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// import { db } from "./config/firebase";

const Seller = () => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          seller_name: formData.get("seller_name") ?? "",
          product_id: formData.get("product_id") ?? "",
          product_name: formData.get("product_name") ?? "",
          product_description: formData.get("product_description") ?? "",
          //   product_image: formData.get("product_image") ?? "",
          product_price: formData.get("product_price") ?? "",
          created_at: Date.now(),
        };
        const product_image = formData.get("product_image");
        if (product_image) {
          const storage = getStorage();
          const storageRef = ref(storage, `images/${product_image.name}`);

          const uploadTask = await uploadBytesResumable(
            storageRef,
            product_image
          );

          console.log(uploadTask);
          const downloadURL = await getDownloadURL(uploadTask.ref);

          obj.product_image_url = downloadURL;

          console.log(downloadURL);
        } else {
          console.error("No file selected for upload.");
        }
        console.log(obj);
        setDb(obj);
      }}
    >
      <label htmlFor="seller_name">Seller Name:</label>
      <input type="text" id="seller_name" name="seller_name" />
      <label htmlFor="product_id">Product Id</label>
      <input type="text" id="product_id" name="product_id" />
      <label htmlFor="product_name">Product Name</label>
      <input type="text" id="product_name" name="product_name" />
      <label htmlFor="product_description">Product Description</label>
      <input type="text" id="product_description" name="product_description" />
      <label htmlFor="product_image">Product Image</label>
      <input type="file" name="product_image" id="product_image" />
      <label htmlFor="product_price">Product Price</label>
      <input type="text" id="product_price" name="product_price" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Seller;
