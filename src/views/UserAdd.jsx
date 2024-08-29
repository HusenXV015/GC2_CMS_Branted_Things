import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js'

export default function AddUser({url}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(e, username, email, password, phoneNumber, address) {
        e.preventDefault()
        try {
            const dataAdded = { username, email, password, phoneNumber, address}

            console.log(dataAdded);
            await axios.post(`${url}/apis/add-user`, dataAdded, {
                headers: {
                    'Authorization': `Bearer ${localStorage.access_token}`
                },


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
                    fontWeight: "bold"
                }
            }).showToast();
            navigate('/')

        } catch (error) {
            console.log(error);
            Toastify({
                text: error.response.data.message,
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
            <form
                action=""
                onSubmit={(e) =>
                    handleSubmit(e, username, email, password, phoneNumber, address)
                }
            >
                <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600">
                                Add User Form
                            </h2>
                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">User Detail</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="full_name">Username</label>
                                                <input
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    type="text"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    defaultValue=""
                                                />
                                            </div>
                                            <div className="md:col-span-5">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Password</label>
                                                <input
                                                    type="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    name="password"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Phone Number</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    name="phoneNumber"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={phoneNumber}
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Address</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    name="Address"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={address}
                                                />
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
    )
}