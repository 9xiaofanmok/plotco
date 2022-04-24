import React from "react";

const ButtonComponent = ({ text, red, disabled }) => {
    return (
        <button
            className={`${
                disabled ? "opacity-50 cursor-default" : "cursor-pointer"
            } ${
                red ? "bg-plotco-red" : "bg-plotco-blue"
            } px-5 py-3 text-white rounded-lg text-sm lg:text-base text-center w-full font-bold`}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;
