import { useNavigate } from "react-router-dom"
import axios from "axios";
import Toastify from 'toastify-js'

export default function Card({ product, url, fetchProducts }) {
  const navigate = useNavigate()

  async function handleDelete(id){
    try {
      await axios.delete(`${url}/apis/branded-things/products/${id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.access_token}`
        }
      })
      Toastify({
        text: "Success delete",
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
            fontWeight: "bold"
        }
    }).showToast();

    fetchProducts()
    } catch (error) {
      oastify({
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

  function handleClick(id) {
    navigate(`/detail/${id}`)
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`)
  }

  return (
    <>
        <div className="transform bg-gray-300 p-4 shadow-xl transition duration-300 hover:scale-105 md:max ">
          <figure className="ml-10">
          <img 
          className="my-4 object-cover h-48 w-96" 
          src={product.imgUrl} 
          alt="product image"/>
          </figure>
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <h3 className="text-gray-600 mb-4">Rp.{product.price}</h3>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full" onClick={() => handleClick(product.id)}>
            Detail
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-full" onClick={() => handleEdit(product.id)}>
            Edit
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-full" onClick={() => handleDelete(product.id)}>
            Delete
          </button>
        </div>
    </>
  );
}
// 