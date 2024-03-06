// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RatingAndReviewSystem {
    struct Review {
        address reviewer;
        string website;
        uint256 rating;
        string reviewText; // New field for the review article
    }

    mapping(string => Review[]) public reviews;

    event ReviewAdded(
        address indexed reviewer,
        string website,
        uint256 rating,
        string reviewText
    );

    function addReview(
        string memory website,
        uint256 rating,
        string memory reviewText
    ) external {
        require(bytes(website).length > 0, "Website cannot be empty");
        require(rating >= 1 && rating <= 5, "Invalid rating");
        require(bytes(reviewText).length > 0, "Review text cannot be empty");

        Review memory newReview = Review({
            reviewer: msg.sender,
            website: website,
            rating: rating,
            reviewText: reviewText
        });

        reviews[website].push(newReview);
        emit ReviewAdded(msg.sender, website, rating, reviewText);
    }

    function getAverageRating(string memory website)
        external
        view
        returns (uint256)
    {
        uint256 totalRating = 0;
        uint256 totalReviews = reviews[website].length;

        if (totalReviews == 0) {
            return 0;
        }

        for (uint256 i = 0; i < totalReviews; i++) {
            totalRating += reviews[website][i].rating;
        }
        return uint256(totalRating / totalReviews);
    }

    function getReviewCount(string memory website)
        external
        view
        returns (uint256)
    {
        return reviews[website].length;
    }

    function getReviews(string memory website)
        external
        view
        returns (string[] memory)
    {
        uint256 totalReviews = reviews[website].length;

        if (totalReviews == 0) {
            return new string[](0); // Return an empty array if there are no reviews
        }

        string[] memory allReviews = new string[](totalReviews);

        for (uint256 i = 0; i < totalReviews; i++) {
            allReviews[i] = reviews[website][i].reviewText;
        }

        return allReviews;
    }
}
