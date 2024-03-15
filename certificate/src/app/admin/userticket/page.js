import React from 'react'

const page = () => {
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
                            <p className="mx-auto font-bold w-16 py-1 px-2">Assest Type</p>
                        </div>
                        <div className="w-[24%] text-center mx-1">
                            <p className="mx-auto font-bold w-16 py-1 px-2">Assest Quantity</p>
                        </div>
                        <div className="w-[24%] text-center mx-1">
                            <p className="mx-auto font-bold w-16 py-1 px-2">Assest Description</p>
                        </div>

                        <div className="w-[24%] text-center mx-1">
                            <p className="mx-auto font-bold w-16 py-1 px-2">Option</p>
                        </div>
                    </div>
                    {/* <div className="bg-white  rounded-lg my-2">
                        {
                            portfoliodata && portfoliodata.map((data, index) => {
                                return (
                                    <div className="flex rounded items-center border-b-2 border-gray-300 px-5 py-5" key={data.id}>
                                        <div className="w-[75%]">
                                            <p className="text-lg font-semibold">{data.Assest_Title}</p>
                                        </div>
                                        <div className="w-[18%] md:w-32 text-center mx-1">
                                            <p className="text-lg font-bold">{data.Assest_Price}</p>
                                        </div>
                                        <div className="w-[18%] md:w-32 text-center mx-1">
                                            <p className="text-lg font-bold">{data.AType}</p>
                                        </div>

                                        <div className="w-[18%] md:w-32 text-center mx-1">
                                            <p className="text-lg font-bold">{data.Assest_Quantity}</p>
                                        </div>
                                        <div className="w-[18%] md:w-32 text-center mx-1">
                                            <p className="text-lg font-bold">{data.Assest_Description}</p>
                                        </div>
                                        <div className="w-[12%] text-center mx-1">
                                            <Link href="" onClick={() => {
                                                removeAssest(index)
                                            }} className="text-red-500 font-bold py-1 px-2">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div> */}

                </div>
            </div>
        </div>
    </div>
  )
}

export default page