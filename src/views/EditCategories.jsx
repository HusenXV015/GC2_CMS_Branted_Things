import axios from "axios";
import Toastify from "toastify-js";
import CategoriesForm from "../components/CategoriesForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditCategories({ url }) {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  async function fecthCategories() {
    try {
      const { data } = await axios.get(
        `${url}apis/branded-things/categories/${id}`,{
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      );
      setCategories(data.data);
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
    fecthCategories();
  }, []);

  async function handleSubmit(e, name) {
    e.preventDefault();
    try {
      const dataC = {
        name,
      };
      await axios.put(`${url}/apis/branded-things/categories/${id}`, dataC, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success edit Categories",
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
      navigate(`/categories`);
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
      <CategoriesForm url={url} handleSubmit={handleSubmit} nameProp={"Edit"} categories={categories} />
    </>
  );
}
