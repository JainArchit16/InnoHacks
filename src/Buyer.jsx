// Buyer.jsx
import { useState, useEffect } from "react";
import "./Buyer.css";
import Review from "./Review";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Webapi from "./web3api";
const Buyer = () => {
  const [products, setProducts] = useState([
    // {
    //   id: 1,
    //   name: "Product 1",
    //   price: 10,
    //   reviews: [],
    //   showReviewSection: false,
    // },
    // {
    //   id: 2,
    //   name: "Product 2",
    //   price: 20,
    //   reviews: [],
    //   showReviewSection: false,
    // },
    // {
    //   id: 3,
    //   name: "Product 3",
    //   price: 30,
    //   reviews: [],
    //   showReviewSection: false,
    // },
  ]);
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

  const handleBuy = (productId) => {
    // Implement logic for buying the product
    alert(`Product with ID ${productId} has been bought!`);
  };

  // const handleSell = (productId) => {
  //   // Implement logic for selling the product
  //   alert(`Product with ID ${productId} has been listed for selling!`);
  // };

  const toggleReviewSection = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
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
          <li key={product.product_id} className="product-item">
            <div className="product-info">
              <span className="product-name">{product.product_name}</span>
              <span className="product-price">${product.product_price}</span>
            </div>
            <div className="product-actions">
              <button
                className="buy-button"
                onClick={() => handleBuy(product.product_id)}
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
        ))}
      </ul>
      <Webapi seller_name="Ayush" />
      <Webapi seller_name="Archit" />
    </div>
  );
};
export default Buyer;
