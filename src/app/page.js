import Image from "next/image";

export default function Home() {
  return (
     <div className="w-full bg-[#fff] dark:bg-slate-900 rounded-md relative mb-10">

            {/* header */}
            <header
                className="flex w-11/12 lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10 mx-auto ">

                <div className="w-1/2 dark:text-[#abc2d3] lg:w-[45%]">
                    <p>Hi there!</p>
                    <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
                        <span className="text-sky-500">Medicare</span> is here for your comfort</h1>
                    <p className="mt-2 text-[1rem]">Health checkups online!</p>
                </div>

                <div className="w-1/2 lg:w-[55%]">
                    <img src="https://i.ibb.co/8ntTD4P4/photo-1579684385127-1ef15d508118-q-80-w-880-auto-format-fit-crop-ixlib-rb-4-1.jpg" alt="image" className=" w-7/12 pt-8"/>
                </div>
            </header>

            <section className="px-8 pb-[30px] mt-8  w-11/12 mx-auto">
                <h1 className="text-[1.3rem] font-semibold text-white">Our Service</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-10 w-[70%]">
                    <div>
                        <img src="https://i.ibb.co/z721j8b/Vector.png" alt="Vector" className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Consultations</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/Qn78BRJ/Ui-Design.png" alt="Vector"
                             className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Health Checkups</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/GcsvXxk/Product.png" alt="Vector"
                             className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Join as a doctor</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.</p>
                    </div>
                </div>
            </section>

            {/* right blur shadow */}
            <div className="w-[100px] h-[100px] bg-[#DC0155] blur-[90px] absolute bottom-[80px] right-[80px]"></div>
        </div>
  );
}
