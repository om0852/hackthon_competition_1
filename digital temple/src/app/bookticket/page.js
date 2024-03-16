"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import defaultpic from "../images/defaultprofile.jpg"
import Web3 from "web3";
import APFOS from "./contract.json"

const Page = () => {
    const router = useRouter();
    const [myContract, setMyContract] = useState(null);
    const [transactionHash, setTransactionHash] = useState(null);
    const [web3, setweb3] = useState(null);
    const [UserPrice, setUserPrice] = useState(0);
    const [sender, setsender] = useState(null);
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }


        // setContract();
        // fetchEthereumPrice();
    }, [])
    const handelData = async (e) => {
        e.preventDefault();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let portfolioid = urlParams.get('pid'); // value1
        const res = await fetch(`http://localhost:3000/api/soldticket`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: portfolioid, Name: data.name, Email: data.email, Phone: data.phone, Members: data.members }),
        });
        const response = await res.json();
        if (response.status == 200) {
            alert("ticket buy successfully")
        }
        else {
            alert("invalid attempt")
        }
    }
    const handleAccountsChanged = async (accounts) => {
        setsender(accounts[0]); // Use the first account in the array
    };
    const fetchEthereumPrice = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
            const data = await response.json();
            return (data.ethereum.inr);
            // setEthPriceInINR(data.ethereum.inr);
        } catch (error) {
            console.error('Error fetching Ethereum price:', error);
        }
    }

    const setContract = async () => {
        try {
            let web3c = new Web3(window.ethereum)
            // console.log(a);
            setweb3(web3c);
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            console.log(accounts);
            setsender(accounts[0]); // Use the first account in the array
            const contractAddress = "0xB35753cE63e2125850519AC6fAE0548C4874D465";
            const myContractInstance = new web3c.eth.Contract(APFOS, contractAddress);
            console.log(myContractInstance)
            setMyContract(myContractInstance);

        } catch (error) {
            // alert("connect to network")
        }
    }
    const BuyAssest = async (e) => {
        e.preventDefault();
        if (!sender) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

        }
        try {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let portfolioid = urlParams.get('pid'); // value1

            const res = await fetch(`http://localhost:3000/api/portfolio/portfoliodetails`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pid: portfolioid,
                }),
            });
            const response = await res.json();
            // e.preventDefault();
            // alert(response.error.RemainingPrice);
            if (response.error == null) {
                return alert("Invalid Asset Purchase");
            }

            // alert(data.BuyAmount < parseFloat(response.error.RemainingPrice))
            if (data.BuyAmount >= 1 && data.BuyAmount <= parseFloat(response.error.RemainingPrice)) {
                try {
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    let pid = urlParams.get('pid'); // value1

                    console.log(web3);

                    let p;
                    try {
                        p = await fetchEthereumPrice();
                        // alert(p);
                    }
                    catch (error) {
                        return alert("check internet connection,try again");
                    }
                    const amountInEther = (parseFloat(data.BuyAmount) / parseFloat(p));
                    const gasEstimation = await myContract.methods
                        .deposit(pid)
                        .estimateGas({
                            from: sender,
                            value: web3.utils.toWei(amountInEther.toString(), 'ether'),
                        });

                    console.log('Gas Estimation:', gasEstimation);


                    const result = await myContract.methods.deposit(pid).send({
                        from: sender,
                        value: web3.utils.toWei(amountInEther.toString(), 'ether'),
                        gas: 100000
                    });

                    console.log(result);

                    setTransactionHash(result.transactionHash);


                    // await handleSubmit(e, result, amountInEther);
                }
                catch (error) {
                    console.log(error)
                    return alert("Invalid Attempt\n reason:-\n 1.Check Metamask Is Installed \n 2.Check Metamask Address \n 3.Transaction is Cancelled");
                }
            } else {
                toast.error(`Enter Amount Between [${1}-${response.error.RemainingPrice}]`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
        }
        catch (error) {
            alert(error.message);
        }
    }
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
        phone: "",
        members: "",
        name: "",
        id: ""

    });

    const onchange = (e) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let portfolioid = urlParams.get('pid'); // value1
        let name = e.target.name;
        let val = e.target.value;
        setdata({ ...data, [name]: val, id: portfolioid });
        console.log(data);
    };


    return (
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto">
            <div className="mb-6 md:mb-0 flex flex-row justify-content-center justify-center my-2">
                <p className="text-2xl text-center text-white font-bold ml-3 bg-red-500 w-auto h-auto py-1 pr-2">
                    <span className=" bg-black text-white px-2 py-1">Bluechip</span> Art{" "}
                </p>
            </div>
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Book Your Ticket Now
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
                                for="organization"
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
                                placeholder="Your Organization"
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="phone"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Phone Number
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="number"
                                name="phone"
                                id="phone"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Your Phone No."
                                required="true"
                            />
                        </div>
                        <div>
                            <label
                                for="members"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                No. Members
                            </label>
                            <input
                                onChange={(e) => onchange(e)}
                                type="number"
                                name="members"
                                id="members"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="No. of Members"
                                required="true"
                            />
                        </div>


                        <button
                            onClick={(e) => handelData(e)}
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Book Nom
                        </button>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
