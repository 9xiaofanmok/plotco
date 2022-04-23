import React from "react";
import ButtonComponent from "./ButtonComponent";

const RoomDescriptionComponent = ({ title, description, img }) => {
    return (
        <div>
            <div
                className={`flex flex-col md:grid md:grid-cols-2 gap-10 w-2/3 mx-auto my-32 h-full`}
            >
                <div className="w-full h-full">
                    <img src={img} alt={title} />
                </div>

                <div className="flex flex-col justify-center text-left">
                    <div className="text-base lg:text-lg mb-5">{title}</div>
                    <div className="text-sm lg:text-base mb-5 font-proxima font-normal">
                        {description}
                    </div>
                    <div className="md:w-1/3">
                        <ButtonComponent text="Book Now" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDescriptionComponent;
