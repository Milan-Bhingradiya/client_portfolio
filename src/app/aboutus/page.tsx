import React from "react";

function page() {
  return (
    <div className=" ">
      <section className="m-8 sm:m-20 ">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="font-heading mb-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                Why choose us?
              </h2>
              <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                We&apos;re your one-stop solution for digital growth.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                From boosting your online presence to maximizing conversions,
                we&apos;ve got you covered. Our team of experts ensures your
                success in the digital landscape.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative ">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <img src="https://www.svgrepo.com/show/503163/api-settings.svg" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                      Advanced SEO Strategies
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Drive organic traffic and boost your search engine rankings
                    with our tailored SEO solutions. We conduct in-depth keyword
                    research, optimize on-page and off-page factors, and provide
                    regular performance reports to ensure continuous
                    improvement.
                  </dd>
                </div>
                <div className="relative ">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <img src="https://www.svgrepo.com/show/503138/webpack.svg" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                      Strategic Marketing Plans
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {" "}
                    Reach your target audience effectively through personalized
                    marketing strategies crafted by our experts. We analyze
                    market trends, identify key demographics, and create
                    engaging content across various platforms to drive brand
                    awareness and customer engagement.
                  </dd>
                </div>
                <div className="relative ">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <img src="https://www.svgrepo.com/show/511771/dashboard-671.svg" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                      Targeted Advertising Campaigns
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {" "}
                    Reach your potential customers where they are with
                    compelling advertising campaigns tailored to your business
                    objectives. We leverage data-driven insights to optimize ad
                    targeting, ad creatives, and ad placements, ensuring maximum
                    ROI for your advertising budget.
                  </dd>
                </div>
                <div className="relative ">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <img src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                      Custom Development Solutions
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {" "}
                    Enhance your online presence with custom web development
                    solutions designed to meet your specific business needs.
                    Whether it&apos;s building a responsive website, creating a
                    dynamic web application, or integrating e-commerce
                    functionality, we deliver scalable and efficient solutions
                    that drive business growth.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
