import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

let token = localStorage.access_token;

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(data.data);
      setTotalPages(data.data.totalPages);
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


  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handlePatch(id) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(
        `${url}/apis/branded-things/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
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

  async function deleteProducts(id) {
    try {
      const { data } = await axios.delete(
        `${url}/apis/branded-things/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/");
      fetchProducts();
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

  function navigateEdit(id) {
    navigate(`/edit/${id}`);
  }

  function navigateAddProducts() {
    navigate(`/add`);
  }

  function navigateCategories() {
    navigate(`/categories`);
  }

  function navigateAddUser() {
    navigate(`/users/add`);
  }

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <>
      <div className="bg-gray-300 h-auto pt-10">
        <section className="container px-4 mx-auto pt-2">
          <div className="flex justify-start ml-3">
            <h1 className="mb-6 font-semibold">
              {" "}
              If you want to go to the list :{" "}
            </h1>
            <button
              onClick={() => navigateCategories()}
              className=" ml-3 btn bg-black rounded-lg text-white p-2 border "
            >
              Category
            </button>
            <button
              onClick={() => navigateAddUser()}
              className=" ml-3 btn bg-black rounded-lg text-white p-2 border "
            >
              + Users
            </button>
          </div>
          <div className="flex items-center gap-x-3 justify-between">
            <h2 className="text-lg font-medium text-black dark:text-black">
              Product :
              <div>
                <span className=" px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  Total Products: {products.length}
                </span>
              </div>
            </h2>
            <div className="flex gap-3">
              <div className="pt-4">
                <button
                  onClick={() => navigateAddProducts()}
                  className="btn bg-black rounded-full text-white p-2 border"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block w-screen py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-teal-500">
                  <table className="min-w-full divide-y divide-gray-200 dark:bg-green-600 overflow-x-auto">
                    <thead className="bg-gray-50 dark:bg-teal-500">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white"
                        >
                          <div className="flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />
                            <span>Photo</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Name</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white "
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Description</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white "
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Price</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white "
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Stock</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 px-4 text-white"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-cyan-500">
                      {products?.map((product, index) => {
                        return (
                          <tr key={product?.id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3 bg">
                                <a className="pr-5">{product?.id}</a>
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="object-cover w-15 h-10 rounded-md"
                                    src={product?.imgUrl}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {product?.name.slice(0, 6)}
                            </td>
                            <td className="py-4 whitespace-normal break-words max-w-xs">
                              {product?.description.slice(0, 100)}...
                            </td>
                            <td className="ps-4 whitespace-normal break-words max-w-xs">
                              Rp.{product?.price}
                            </td>
                            <td className="ps-4 whitespace-normal break-words max-w-xs">
                              {product?.stock}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button
                                  onClick={() => deleteProducts(product.id)}
                                  className="text-white transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => navigateEdit(product.id)}
                                  className="text-white transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l2.651 2.65m-4.573-1.908l2.651 2.65m-4.573-1.908a2.25 2.25 0 00-3.182 3.182L12.66 9.602m0 0l-1.675 5.034a1.75 1.75 0 002.198 2.197l5.035-1.675m-5.034-1.675l5.034-5.034m-5.034 5.034l-4.573 4.573M5.25 18h.008v.008H5.25V18z"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                />
                                <button
                                  onClick={() => handlePatch(product.id)}
                                  className="text-black font-bold transition-colors duration-200 dark:hover:text-pink-500 dark:text-black hover:text-pink-500 focus:outline-none"
                                >
                                  Upload
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
