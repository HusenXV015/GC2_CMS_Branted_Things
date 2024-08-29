import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function ProductsForm({ url, handleSubmit, products, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    if (products) {
      setName(products.name);
      setDescription(products.description);
      setImgUrl(products.imgUrl);
      setPrice(products.price);
      setStock(products.stock);
      setCategoryId(products.categoryId);
    }
  }, [products]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/pub/branded-things/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
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
    fetchCategories();
  }, []);

  return (
    <>
      <form
        action=""
        onSubmit={(e) =>
          handleSubmit(e, name, description, imgUrl, stock, price, +categoryId)
        }
      >
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">
                {nameProp} Product Form
              </h2>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Product Detail</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Products name</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          value={name}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Product Description</label>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          value={description}
                          className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="address">Image URL</label>
                        <input
                          type="text"
                          onChange={(e) => setImgUrl(e.target.value)}
                          name="imageUrl"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={imgUrl}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="address">Price</label>
                        <input
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          name="price"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={price}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="address">Stock</label>
                        <input
                          type="number"
                          onChange={(e) => setStock(e.target.value)}
                          name="stock"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={stock}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="zipcode">Categories</label>
                        <select
                          onChange={(e) => setCategoryId(e.target.value)}
                          name="category"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                          {categories.map((c)=> {
                            return (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="btn  bg-blue-500 hover:bg-blue-700 text-white font-bol py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
