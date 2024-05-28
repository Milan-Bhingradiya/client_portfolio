import React from 'react'
import Image from 'next/image'
import reviewer1 from "../../../public/reviewer1.jpg"
import reviewer2 from "../../../public/reviewer2.jpg"
import reviewer3 from "../../../public/reviewer3.jpg"
import reviewer4 from "../../../public/reviewer4.jpg"
function Review() {
    return (
        <div>

            <section id="testimonies" className="py-20 ">
                <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">


                    <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
                        <div className="mb-8 space-y-2 md:mb-16 md:text-center">
                            <div className="text-xl  md:text-center md:text-2xl">
                                Words from Others
                            </div>

                            <h1 className="mb-2 text-3xl font-semibold  md:text-center md:text-5xl">
                                Its not just us.
                            </h1>
                            <p className="text-xl  md:text-center md:text-2xl">
                                Heres what others have to say about us.
                            </p>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">


                        <ul className="space-y-8">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/kanyewest" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                              src={reviewer1}
                                              className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                                                    <p className="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Find God.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                                src={reviewer2}
                                               className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                                    <p className="text-gray-500 text-md">CEO of Apple</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                                fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                                aliquam malesuada bibendum.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/kanyewest" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                               src={reviewer3}
                                              className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                                                    <p className="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Find God.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>

                        </ul>


                        <ul className="hidden space-y-8 sm:block">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                                src={reviewer4}
                                                 className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                                                    <p className="text-gray-500 text-md">CEO of Twitter</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitae
                                                semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                                pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                              src={reviewer1}
                                                 className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                                    <p className="text-gray-500 text-md">CEO of Apple</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                                fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                                aliquam malesuada bibendum.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                             src={reviewer2}    className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                                                    <p className="text-gray-500 text-md">CEO of Twitter</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitae
                                                semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                                pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>

                        </ul>


                        <ul className="hidden space-y-8 lg:block">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                               src={reviewer3}  className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                                                    <p className="text-gray-500 text-md">CEO of Microsoft</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean et
                                                tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                                eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/dan_schulman" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                              src={reviewer4}
                                              className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                                                    <p className="text-gray-500 text-md">CEO of PayPal</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam sem
                                                et tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"> <Image
                                              src={reviewer1}   className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella"></Image>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                                                    <p className="text-gray-500 text-md">CEO of Microsoft</p>
                                                </div>
                                            </div>
                                            <p className="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean et
                                                tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                                eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                                        </div>
                                    </a>
                                </div>
                            </li>

                        </ul>


                    </div>
                </div>
            </section>
        </div>
    )
}

export default Review