// Buyer.jsx
import { useState, useEffect } from "react";
import "./Buyer.css";
import Review from "./Review";
import { db } from "./config/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Webapi from "./web3api";
const Buyer = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const userDataArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    console.log(userDataArray);

    setProducts(userDataArray);
    console.log(userDataArray);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const update = async (seller_name) => {
    const q = query(
      collection(db, "Sellers"),
      where("seller_name", "==", seller_name)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first document from the query result
      const docRef = querySnapshot.docs[0].ref;
      const userData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      await updateDoc(docRef, {
        seller_name: seller_name,
        count: userData[0].count + 1,
      });
    }
  };
  const handleBuy = async (productId, seller_name) => {
    // Implement logic for buying the product
    update(seller_name);
    alert(`Product with ID ${productId} has been bought!`);
  };

  // const handleSell = (productId) => {
  //   // Implement logic for selling the product
  //   alert(`Product with ID ${productId} has been listed for selling!`);
  // };

  const toggleReviewSection = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === productId
          ? { ...product, showReviewSection: !product.showReviewSection }
          : product
      )
    );
  };

  const handleReviewSubmit = (productId, review) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, reviews: [...product.reviews, review] }
          : product
      )
    );
  };

  return (
    <div className="buyer-container">
      <h2>Products for Sale</h2>
      <ul className="product-list">
        {products.map((product) => (
          <div key={product.product_id}>
            <div>Seller:{product.seller_name}</div>
            <li key={product.product_id} className="product-item">
              <div className="product-info">
                <span className="product-name">{product.product_name}</span>
                <img
                  src={product.product_image_url}
                  alt="image"
                  className="image"
                />
                <span className="product-price">${product.product_price}</span>
                <span className="product-description">{product.product_description}</span>
              </div>
              <div className="product-actions">
                <button
                  className="buy-button"
                  onClick={() =>
                    handleBuy(product.product_id, product.seller_name)
                  }
                >
                  Buy
                </button>
                <button
                  className="add-review-button"
                  onClick={() => toggleReviewSection(product.product_id)}
                >
                  {product.showReviewSection ? "Cancel" : "Add Review"}
                </button>
              </div>
              {product.showReviewSection && (
                <Review
                  productId={product.product_id}
                  onReviewSubmit={handleReviewSubmit}
                />
              )}
            </li>
          </div>
        ))}
      </ul>
      <Webapi seller_name="Ayush" />
      <Webapi seller_name="Archit" />
    </div>
  );
};
export default Buyer;
