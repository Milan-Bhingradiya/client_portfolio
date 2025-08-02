import React from 'react'
import Image from 'next/image'

import card from '../../../public/cardimg.jpeg'
function Card() {
    return (
        <div className=' m-3 sm:m-10'>



            <div
                className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                    <Image
                        height={200}
                        width={400}
                        src={card}
                        alt="ui/ux review check" ></Image>
                </div>
                <div className="p-6">
                    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        UI/UX Review Check
                    </h4>
                    <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                        Because it ;s about motivating the doers. Because I ;m here to
                        follow my dreams and inspire others.
                    </p>
                </div>
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center -space-x-3">
                        <Image alt="natali craig"
                            height={100}
                            width={100}
                            src={card}
                            className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" ></Image>
                        <Image alt="Tania Andrew"
                            src={card}
                            className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
                    </div>
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                        January 10
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card