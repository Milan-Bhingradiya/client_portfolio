import React from "react";
import Image from "next/image";
import reviewer1 from "../../../public/reviewer1.jpg";
import reviewer2 from "../../../public/reviewer2.jpg";
import reviewer3 from "../../../public/reviewer3.jpg";
import reviewer4 from "../../../public/reviewer4.jpg";
function Review() {
  return (
    <div>
      <section id="testimonies" className="py-20 ">
        <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
         

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <ul className="space-y-8">
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/kanyewest"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer1}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Kanye West"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Kanye West
                          </h3>
                          <p className="text-gray-500 text-md">
                            Rapper &amp; Entrepreneur
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        KPI Agency&apos;s marketing team elevated our brand
                        visibility like never before. Their strategic campaigns
                        drove tangible results, increasing our customer
                        engagement and conversion rates. With their creative
                        approach and data-driven strategies, KPI Agency is our
                        trusted partner for long-term marketing success.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/tim_cook"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer2}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Tim Cook
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        Thanks to KPI Agency&apos;s SEO expertise, our
                        website&apos;s visibility skyrocketed across search
                        engines. Their meticulous optimization techniques
                        propelled us to the top of relevant search results,
                        significantly boosting organic traffic. KPI&apos;s
                        commitment to staying ahead of industry trends ensures
                        our continued growth and dominance in the digital
                        landscape
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/kanyewest"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer3}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Kanye West"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Kanye West
                          </h3>
                          <p className="text-gray-500 text-md">
                            Rapper &amp; Entrepreneur
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        KPI Agency&apos;s consultancy services provided
                        invaluable insights that reshaped our business
                        strategies for the better. Their team&apos;s deep
                        industry knowledge and personalized approach helped us
                        identify and capitalize on untapped opportunities. With
                        KPI&apos;s guidance, we&apos;ve achieved unprecedented
                        growth and are confidently navigating future challenges
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            <ul className="hidden space-y-8 sm:block">
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/paraga"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer4}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Parag Agrawal"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Parag Agrawal
                          </h3>
                          <p className="text-gray-500 text-md">
                            CEO of Twitter
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        Working with KPI Agency on our website development was a
                        game-changer for our online presence. Their team
                        translated our vision into a visually stunning and
                        highly functional website that captivates visitors.
                        Their attention to detail and commitment to delivering
                        on time and within budget exceeded our expectations. KPI
                        Agency truly sets the standard for web development
                        excellence.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/tim_cook"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer1}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Tim Cook
                          </h3>
                          <p className="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        KPI Agency&apos;s marketing prowess transformed our
                        brand&apos;s online presence and drove measurable
                        results. Their innovative campaigns not only attracted
                        new customers but also fostered deeper engagement with
                        our existing audience. With KPI&apos;s strategic
                        approach and unwavering dedication, we&apos;ve seen
                        remarkable growth and are excited for what the future
                        holds.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/paraga"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer2}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Parag Agrawal"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Parag Agrawal
                          </h3>
                          <p className="text-gray-500 text-md">
                            CEO of Twitter
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        Partnering with KPI Agency for SEO was one of the best
                        decisions we made for our business. Their team&apos;s
                        expertise and dedication propelled us to the top of
                        search engine rankings, resulting in a significant
                        increase in organic traffic and conversions. KPI=&apos;s
                        ongoing optimization efforts ensure our continued
                        success in a highly competitive digital landscape.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            <ul className="hidden space-y-8 lg:block">
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/satyanadella"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer3}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Satya Nadella"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Satya Nadella
                          </h3>
                          <p className="text-gray-500 text-md">
                            CEO of Microsoft
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        ToKPI Agency&apos;s consultancy services provided
                        invaluable strategic guidance that has reshaped our
                        business trajectory. Their team&apos;s deep industry
                        insights and personalized approach helped us identify
                        and capitalize on key growth opportunities. With
                        KPI&apos;s expert advice, we&apos;ve achieved remarkable
                        results and are confidently moving towards our long-term
                        goals
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/dan_schulman"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer4}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Dan Schulman"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Dan Schulman
                          </h3>
                          <p className="text-gray-500 text-md">CEO of PayPal</p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        Choosing KPI Agency for our web development needs was a
                        decision we&apos;ll never regret. Their team&apos;s
                        expertise and creativity transformed our online
                        presence, delivering a website that not only looks
                        stunning but also performs seamlessly. KPI&apos;s
                        professionalism, attention to detail, and commitment to
                        client satisfaction set them apart as the go-to web
                        development agency
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/satyanadella"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Image
                          src={reviewer1}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Satya Nadella"
                        ></Image>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Satya Nadella
                          </h3>
                          <p className="text-gray-500 text-md">
                            CEO of Microsoft
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal text-gray-300 text-md">
                        KPI Agency&apos;s marketing strategies have been
                        instrumental in driving our business forward. Their
                        team&apos;s innovative campaigns and data-driven
                        approach have significantly boosted our brand awareness
                        and customer engagement. With KPI&apos;s expertise and
                        dedication, we&apos;ve achieved remarkable growth and
                        are excited for what the future holds.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Review;
