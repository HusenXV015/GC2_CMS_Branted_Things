import axios from "axios";
import Toastify from "toastify-js";
import ProductsForm from "../components/ProductForm";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function EditProduct({ url }) {
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.access_token}` }
        }
      );
      setProducts(data.data);
    } catch (error) {
        console.log(error);
        
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSubmit(
    e,
    name,
    description,
    imgUrl,
    stock,
    price,
    categoryId
  ) {
    e.preventDefault();
   
    try {
        const addedData = {
            name,
            description,
            imgUrl,
            stock: +stock,
            price: +price,
            categoryId: +categoryId,
          };
      await axios.put(`${url}/apis/branded-things/products/${id}`, addedData, {
        headers: {
        Authorization: `Bearer ${localStorage.access_token}`
        },
      });
      Toastify({
        text: "Success edit product",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }
  return (
    <>
      <ProductsForm url={url} products={products} handleSubmit={handleSubmit} nameProp={"Edit Products"} />
    </>
  );
}
