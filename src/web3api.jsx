import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import "./App.css";

const Webapi = ({ seller_name }) => {
  const [data, setData] = useState(null); // Initialize data as null
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://innohacks-api.onrender.com/getReviews/${seller_name}`
        );
        const json = await res.json();
        setData(json);
        const resRate = await fetch(
          `https://innohacks-api.onrender.com/getAverageRating/${seller_name}`
        );
        const rateJson = await resRate.json();
        setRating(rateJson);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null); // Set data to null if an error occurs
      }
    };

    fetchData();
  }, [seller_name]); // Add seller_name to dependency array

  return (
    <div>
      {data ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Seller</th>
                <th>Review</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.website}</td>
                <td>
                  {data.reviews.map((rev, index) => (
                    <div key={index}>{rev}</div>
                  ))}
                </td>
                <td>
                  <div>
                    <ReactStars
                      count={5}
                      value={parseFloat(rating.averageRating)}
                      size={20}
                      edit={false}
                      color2={"#ffd700"} // Color for filled stars
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default Webapi;
