'use client'
import Image from "next/image";
import Slider from "./components/Slider";
import Link from "next/link";
import { useEffect, useState } from "react";


// import { Slide } from "react-slideshow-image";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
  const [ticketdata, setticketdata] = useState(null)



  useEffect(() => {
    fetchdata();
  }, [])


  const fetchdata = async () => {
    const res = await fetch(
      `http://localhost:3000/api/checkticket`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: "",
      }
    );
    const response = await res.json();
    console.log(response);
    setticketdata(response.message)
  };



  return (
    <>
      <div>
        <Slider />
        <>
          <div>
            <section className="text-gray-600 body-font min-h-screen">
              <div className="flex flex-col justify-center items-center w-auto p-4 md:p-10 overflow-hidden">
                <div className="flex flex-wrap w-full justify-center items-center">
                  <div className="text-center w-full my-2">
                    <span className="text-white font-bold text-xl">

                    </span>
                  </div>
                  {ticketdata &&
                    ticketdata.map((elem, index) => {
                      if (index < 600) {
                        console.log(elem);
                        return (
                          <div key={index}>
                            <div className="bg-white shadow-md rounded-lg max-w-sm m-2">
                              <Link
                                key={index}
                                href={`/admin/userticket?pid=${elem.id}`}
                              >
                                <h2 className="m-2 p-3 font-bold text-blue-600 text-3xl">
                                  {elem.Name}
                                </h2>
                              </Link>
                              <div className="m-2 px-4 pb-4">
                                <span className="text-md text-black font-medium">
                                  StartTime:{elem.StartTime}
                                </span><br />
                                <span className="text-md text-black font-medium">
                                  EndTime:{elem.EndTime}
                                </span><br />
                                <span className="text-md text-black font-medium">
                                  Price:{elem.Price}
                                </span>

                                <div className="flex items-center justify-center my-2 mt-4">

                                  <Link href={"/bookticket?pid=" + elem._id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Book Now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </section>
          </div>
        </>
      </div>
    </>
  );
}
