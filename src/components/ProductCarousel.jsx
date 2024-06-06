import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProductCarousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server, set header with jwt
    axiosInstance
      .get("/api/product", {
        headers: {
          //Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Response: ", res);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Naruto Figure 1",
  //     description: "Test",
  //     price: 110,
  //     category: null,
  //     imageUrl:
  //       "https://img2.cgtrader.com/items/2895079/2f05452561/large/naruto-uzumaki-3d-model-stl.jpg",
  //     creationDate: "2024-06-02T20:11:08.000+00:00",
  //   },
  //   {
  //     id: 2,
  //     name: "Naruto Figure 2",
  //     description: "Test",
  //     price: 50,
  //     category: null,
  //     imageUrl:
  //       "https://llllline.com/images/thumbs/naru/naruto-figure-3d-model-ready-to-print-stl-0000054872-800.jpeg",
  //     creationDate: null,
  //   },
  //   {
  //     id: 3,
  //     name: "Naruto Figure 2",
  //     description: "Test",
  //     price: 50,
  //     category: null,
  //     imageUrl:
  //       "https://llllline.com/images/thumbs/naru/naruto-figure-3d-model-ready-to-print-stl-0000054872-800.jpeg",
  //     creationDate: null,
  //   },
  //   {
  //     id: 4,
  //     name: "Naruto Figure 2",
  //     description: "Test",
  //     price: 50,
  //     category: null,
  //     imageUrl:
  //       "https://llllline.com/images/thumbs/naru/naruto-figure-3d-model-ready-to-print-stl-0000054872-800.jpeg",
  //     creationDate: null,
  //   },
  // ];

  function renderProductsCarousel(products) {
    if (!products || products.length === 0) {
      return;
    }
    return (
      <div className="relative carousel carousel-center p-4 space-x-4 rounded-box h-[400px]">
        {products.map((p, index) => (
          <div
            key={p.id}
            id={`slide${index + 1}`}
            className="carousel-item relative flex flex-col h-full"
          >
            {/* Card Content start */}
            <h2 className="text-center font-semibold">{p.name}</h2>
            <img src={p.imageUrl} className="rounded-box  h-3/4" />
            <Link to={`/product/${p.id}`} className="btn btn btn-accent my-3">
              Detail
            </Link>
          </div>
        ))}
      </div>
    );
  }
  return <div>{renderProductsCarousel(products)}</div>;
}

export default ProductCarousel;
