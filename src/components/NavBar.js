import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/plotco-logo-crop.png";

const NavBar = () => {
    return (
        <div className="flex justify-between items-center bg-plotco-yellow px-8 py-5 sm:px-10 sm:py-8 lg:px-20 lg:py-10">
            <img
                src={logo}
                alt="PLOTCO Logo"
                className="w-1/6 lg:w-1/12 lg:py-2"
            />
            <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl text-right flex flex-row">
                <Link to="/">
                    <div className="pl-3 sm:pl-10 lg:pl-20  hover:text-grey-100 visited:text-white">
                        Home
                    </div>
                </Link>
                <a href="#Rooms">
                    <div className="pl-3 sm:pl-10 lg:pl-20 hover:text-grey-100 visited:text-white">
                        Our Rooms
                    </div>
                </a>
                <a href="#FAQs">
                    <div className="pl-3 sm:pl-10 lg:pl-20 hover:text-grey-100 visited:text-white">
                        FAQs
                    </div>
                </a>
            </div>
        </div>
    );
};

export default NavBar;
