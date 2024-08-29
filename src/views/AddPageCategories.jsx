import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoriesForm from "../components/CategoriesForm";
import Toastify from 'toastify-js';

export default function AddPageCategories({url}){
    const navigate = useNavigate();

    async function handleSubmit(
        e,
        name
    ){
        e.preventDefault()

        const addcate = {
            name
        }
        try {
            const { data } = await axios.post(`${url}/apis/branded-things/categories`, addcate, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
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
              navigate("/categories");  
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
            <CategoriesForm url={url} handleSubmit={handleSubmit} nameProp={"add"} />
        </>
    )
}