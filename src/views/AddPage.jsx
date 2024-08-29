import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductsForm from "../components/ProductForm";
import Toastify from 'toastify-js';

export default function AddPage({ url }) {
  const navigate = useNavigate();

  async function handleSubmit(e, 
    name, 
    description, 
    imgUrl, 
    stock, 
    price, 
    categoryId) {
    e.preventDefault(); 
    
    const addedData = {
      name,
      description,
      imgUrl,
      stock: +stock,
      price: +price,
      categoryId: +categoryId
    };

    try {
      const { data } = await axios.post(`${url}/apis/branded-things/products`, addedData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      });
      Toastify({
        text: "Success add new data",
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
          fontWeight: "bold"
        }
      }).showToast();
    }
  }

  return (
    <>
      <ProductsForm url={url} handleSubmit={handleSubmit} nameProp={"Add"} />
    </>
  );
}
