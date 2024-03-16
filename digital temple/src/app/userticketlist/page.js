"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    const [ticketdata, setticketdata] = useState(null)
    useEffect(() => {
        fetchdata();
    }, [])

    let total = 0
    const fetchdata = async () => {
        const res = await fetch(
            `http://localhost:3000/api/userticketlist`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: "salaya8982@scubalm.com" }),
            }
        );
        const response = await res.json();
        console.log(response);
        setticketdata(response.message)
    };

    return (
        <div>
            <div className="w-full h-screen rounded p-2 md:px-16">
                <div className="flex justify-center items-center my-2 mb-4">
                    <span className="text-white text-lg font-bold">Ticket List</span>
                </div>
                <div className="w-[100%] overflow-auto">
                    <div className="max-h-[70vh] w-[50rem] md:w-full md:p-3 bg-white rounded  p-4 md:px-2 overflow-y-scroll">
                        <div className="sticky top-0 flex bg-blue-500 rounded items-center border-b border-gray-300 px-5 py-2">
                            <div className="w-[75%] ">
                                <p className="text-lg font-bold">Name</p>
                            </div>
                            <div className="w-[18%] md:w-32 text-center mx-1">
                                <p className="text-lg font-bold">Price</p>
                            </div>
                            <div className="w-[24%] text-center mx-1">
                                <p className="mx-auto font-bold w-16 py-1 px-2">Members</p>
                            </div>
                            <div className="w-[24%] text-center mx-1">
                                <p className="mx-auto font-bold w-16 py-1 px-2">Ticket Type</p>
                            </div>

                        </div>
                        <div className="bg-black  rounded-lg my-2">
                            {
                                ticketdata && ticketdata.map((data, index) => {
                                    total = data.Members * data.Price

                                    return (
                                        <div className="flex rounded items-center border-b-2 border-gray-300 px-5 py-5" key={data.Name}>
                                            {/* <div className="w-[75%]">
                                                <p className="text-lg font-semibold">{data.Name}</p>
                                            </div>
                                            <div className="w-[18%] md:w-32 text-center mx-1">
                                                <p className="text-lg font-bold">{data.Members}</p>
                                            </div>
                                            <div className="w-[18%] md:w-32 text-center mx-1">
                                                <p className="text-lg font-bold">{data.TicketName}</p>
                                            </div> */}
                                            <div className="w-[75%] ">
                                                <p className="text-lg font-bold">{data.Name}</p>
                                            </div>
                                            <div className="w-[18%] md:w-32 text-center mx-1">
                                                <p className="text-lg font-bold">{data.Price}</p>
                                            </div>
                                            <div className="w-[24%] text-center mx-1">
                                                <p className="mx-auto font-bold w-16 py-1 px-2">{data.Members}</p>
                                            </div>
                                            <div className="w-[24%] text-center mx-1">
                                                <p className="mx-auto font-bold w-16 py-1 px-2">{data.TicketName}</p>
                                            </div>

                                        </div>
                                    );
                                })
                            }
                            <div>Total:{total}</div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page