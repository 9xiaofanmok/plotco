import React from "react";
import logo from "../assets/plotco-logo-crop.png";

const Footer = () => {
    return (
        <div className="bg-plotco-yellow px-10 py-14 sm:px-20 sm:py-24 lg:px-24 lg:py-32">
            <img src={logo} alt="PLOTCO Logo" className="w-1/6 xl:w-1/12" />
        </div>
    );
};

export default Footer;
