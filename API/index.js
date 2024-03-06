const ethers = require("ethers");
require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

// console.log(ethers.JsonRpcProvider());
const provider = new ethers.JsonRpcProvider(API_URL);
const cors = require("cors");
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./src/RatingAndReviewSystem.json");

const contract = new ethers.Contract(contractAddress, abi, signer);

const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

// console.log(contract.getAverageRating());

// app.post("/addReview", async (req, res) => {
//   try {
//     const { website, rating, reviewText } = req.body;

//     // Call the Ethereum contract method
//     const result = await contract
//       .addReview(website, rating, reviewText)
//       .send({ from: "YOUR_SENDER_ADDRESS" });

//     res.json({
//       message: "Review added successfully",
//       reviewer: result.events.ReviewAdded.returnValues.reviewer,
//       website: result.events.ReviewAdded.returnValues.website,
//       rating: result.events.ReviewAdded.returnValues.rating,
//       reviewText: result.events.ReviewAdded.returnValues.reviewText,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Endpoint to get average rating
app.get("/getAverageRating/:website", async (req, res) => {
  try {
    const { website } = req.params;
    const averageRating = await contract.getAverageRating(website);

    res.json({ website, averageRating: Number(averageRating) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get review count
app.get("/getReviewCount/:website", async (req, res) => {
  try {
    const { website } = req.params;
    const reviewCount = await contract.getReviewCount(website);

    res.json({ website, reviewCount: Number(reviewCount) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get reviews
app.get("/getReviews/:website", async (req, res) => {
  try {
    const { website } = req.params;
    const reviews = await contract.getReviews(website);

    res.json({ website, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("API server is listening on port");
});
