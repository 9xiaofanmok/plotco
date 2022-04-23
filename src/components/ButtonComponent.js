import React from "react";

const ButtonComponent = ({ text }) => {
    return (
        <div className="bg-plotco-blue px-5 py-3 text-white rounded-lg text-sm lg:text-base text-center">
            {text}
        </div>
    );
};

export default ButtonComponent;
