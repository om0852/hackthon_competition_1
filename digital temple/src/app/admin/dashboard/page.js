'use client'
import Link from 'next/link'
import React, { useState } from 'react'



const page = () => {
    const [Admindata, setAdmindata] = useState([2,1,3,5,7,6,4])

  return (
  <>
 <section className="text-gray-600 body-font min-h-screen">
        <div className="flex flex-col justify-center items-center w-auto p-4 md:p-10 overflow-hidden">
          <div className="flex flex-wrap w-full justify-center items-center">
            <div className="text-center w-full my-2">
              <span className="text-white font-bold text-xl">
                
              </span>
            </div>
            {Admindata &&
              Admindata.map((elem, index) => {
                if (index < 6) {
                  console.log(elem);
                  return (
                    <div key={index}>
                     

                      <div className="bg-white shadow-md rounded-lg max-w-sm m-2">
                        <Link
                          key={index}
                          href={``}
                        >
                          <h2 className="m-2 p-3 font-bold text-blue-600 text-3xl">
"                            {elem.PortfolioName}
"                          </h2>
                        </Link>
                        <div className="m-2 px-4 pb-4">
                          <p>
                            <span className="text-black font-medium text-lg tracking-tight ">
                              {/* {(elem ? elem.overview : "").slice(0, 100) + "..."} */}
                              Explore Edward Babcock&apos;s board &apos;Tri color
                              combinations&apos; on Pinterest. See more ideas about
                              color, color combinations, color inspiration.
                            </span>
                          </p>

                          <div className="flex items-center justify-center my-2 mt-4">
                            <Link
                              onClick={() => {
                               
                              }}
                              href={""}
                            >
                              <p className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Buy
                              </p>
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
  </>
  )
}

export default page