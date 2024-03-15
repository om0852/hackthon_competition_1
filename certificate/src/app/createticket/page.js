"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import defaultpic from "../images/defaultprofile.jpg"

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token").toString();
            const decoded = jwtDecode(token);
            console.log(decoded);
            // Check for expired token
            var dateNow = new Date() / 1000;
            if (dateNow > decoded.exp) {
                // alert("Your session has been expired.");
                // localStorage.removeItem("token");
                // router.push("/login");
            } else {
                toast.error("Your are LoggedIn", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                if (decoded.role == "admin") {
                    // router.push('/');
                }
            }
        } else {
            // router.push('/orgsignup');
        }
    }, []);

    const [data, setdata] = useState({
        email: "",
        name: "",
        StartTime: "",
        EndTime: "",
        StartDate: "",
        EndDate: "",
        RemainingTicket: "",
        Place: "",
        Price: "",
    });

    const onchange = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        setdata({ ...data, [name]: val });
        console.log(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (true) {
            const res = await fetch(`http://localhost:3000/api/createticket`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Name: data.name, Email: data.email, Phone: 2333, Place: data.Place, StartTime: data.StartTime, EndTime: data.EndTime, RemainingTicket: data.RemainingTicket, StartDate: "2345", EndDate: "23456", Price: data.Price }),
            });
            const response = await res.json();
            if (response.status === 200) {
                toast.success("Registration Successful", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                localStorage.setItem("APFOS_useremail", data.email);
                setTimeout(() => {
                    router.push("/addwalletdetails");
                }, 1000);
            } else {
                toast.error(response.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }

    };
    return (
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto">
            <div className="mb-6 md:mb-0 flex flex-row justify-content-center justify-center my-2">
                <p className="text-2xl text-center text-white font-bold ml-3 bg-red-500 w-auto h-auto py-1 pr-2">
                    <span className=" bg-black text-white px-2 py-1">Digital</span> Temple{" "}
                </p>
            </div>
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Create Ticket
                    </h1>

                    <form className="space-y-4 md:space-y-6" action="#" method="POST">
                        <div>
                            <label
                                for="email"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Your email
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                placeholder="name@company.com"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="name"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Name
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="text"
                                name="name"
                                id="name"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Your Name"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="price"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Price
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="number"
                                name="Price"
                                id="Price"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Price of Ticket"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="StartTime"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Start Time
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="time"
                                name="StartTime"
                                id="StartTime"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Start Time"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="EndTime"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                End Time
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="time"
                                name="EndTime"
                                id="EndTime"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="End Time"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="StartDate"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Start Date
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="date"
                                name="StartDate"
                                id="StartDate"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Start Date"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="End Date"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                End Date
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="date"
                                name="StartDate"
                                id="StartDate"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Start Date"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="Remaining Ticket"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Remaining Ticket
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="number"
                                name="RemainingTicket"
                                id="RemainingTicket"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Remaining Ticket"
                                required="true"
                            />
                        </div>


                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Submit
                        </button>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
