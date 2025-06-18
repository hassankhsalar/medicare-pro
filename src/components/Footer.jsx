'use client'
import React from "react";

// react icons
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";

const ResponsiveFooter = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 boxShadow rounded-xl w-full p-6 md:p-9">
            <div className="flex justify-center gap-[30px] flex-wrap w-full sm:px-32">
                <div
                    className="flex justify-center sm:justify-between gap-[30px] w-full flex-wrap">
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Service</p>
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Features</p>
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Our
                        Team</p>
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Portfolio</p>
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Blog</p>
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Contact
                        Us</p>
                </div>

                <div className="flex items-center flex-wrap gap-[10px] text-[#424242]">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300">
                        <CgFacebook/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300">
                        <BsTwitter/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300">
                        <BsInstagram/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300">
                        <BsLinkedin/>
                    </a>
                </div>


                <div
                    className="border-t dark:border-slate-700 border-gray-200 pt-[20px] flex items-center w-full flex-wrap gap-[20px] justify-center">
                    <p className="text-[0.8rem] dark:text-slate-500 sm:text-[0.9rem] text-gray-600">© 2024 ZenUI
                        Library. All Rights
                        Reserved. </p>
                </div>
            </div>
        </footer>
    );
};

export default ResponsiveFooter;
                    