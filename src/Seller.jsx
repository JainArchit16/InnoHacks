import { setDb } from "./setDb";

const Seller = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          seller_name: formData.get("seller_name") ?? "",
          product_name: formData.get("product_name") ?? "",
          product_description: formData.get("product_description") ?? "",
          product_image: formData.get("product_image") ?? "",
          product_price: formData.get("product_price") ?? "",
        };
        console.log(obj);
        setDb(obj);
      }}
    >
      <label htmlFor="seller_name">Seller Name:</label>
      <input type="text" id="seller_name" name="seller_name" />
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
