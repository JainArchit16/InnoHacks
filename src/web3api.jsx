import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Webapi = ({ seller_name }) => {
  const [data, setData] = useState(null); // Initialize data as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://innohacks-api.onrender.com/getReviews/${seller_name}`
        );
        const json = await res.json();
        console.log(json);
        setData(json);
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
          <div>Seller: {data.website}</div>
          <div>
            {data.reviews.map((rev, index) => (
              <div key={index}>{rev}</div>
            ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Webapi;
