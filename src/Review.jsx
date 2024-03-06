/* eslint-disable react/prop-types */
// Review.jsx
import { useState } from "react";

const Review = ({ productId, onReviewSubmit }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") return;
    onReviewSubmit(productId, reviewText);
    setReviewText("");
  };

  return (
    <div className="review-section">
      <h3>Reviews</h3>
      <ul>{/* Display existing reviews here */}</ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write a review"
          rows={5} // Increase the number of rows
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;
