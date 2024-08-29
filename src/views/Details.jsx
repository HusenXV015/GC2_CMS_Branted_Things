import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import pacmanLoad from "../assets/Bean-Eater@1x-1.0s-200px-200px.svg";

export default function Detail({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function newsArticle() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products/${id}`
      );
      setProducts(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    newsArticle();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="mt-32 flex justify-center items-center">
            <img src={pacmanLoad} />
          </div>
        </>
      ) : (
        <>
          <div className="p-20 bg-gray-100 shadow-2xl flex flex-row">
            <figure className="flex flex-1">
              <img
                src={products.imgUrl}
                alt="Article image"
                className="w-1/2 ml-20 rounded-xl"
              />
            </figure>
            <div className="flex flex-1 flex-col">
              <b className="mb-5 text-left">{products.name}</b>
              <p className="text-left">
                {products.description}
              </p>
              <h1 className="mt-5 text-lg font-semibold" >silakan beli Dengan harga Rp.{products.price}</h1>
              <h4 className="mt-1 text-lg " >Stok nya hanya {products.stock}</h4>
            </div>
          </div>
          
        </>
      )}
    </>
  );
}
