import React from "react";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router-dom";

const RoomDescriptionComponent = ({ room }) => {
    const navigate = useNavigate();
    const bookNow = (id, name) => {
        navigate(`/book?roomId=${id}&roomName=${name}`);
    };
    return (
        <div>
            <div
                className={`flex flex-col lg:grid lg:grid-cols-2 gap-10 w-2/3 mx-auto mt-5 mb-16 lg:mt-20 lg:mb-32 h-full`}
            >
                <div className="w-full h-full">
                    <img src={room.img} alt={room.title} />
                </div>

                <div className="flex flex-col justify-center text-left">
                    <div className="text-base lg:text-lg mb-5">
                        {room.title}
                    </div>
                    <div className="text-sm lg:text-base mb-5 font-proxima font-normal">
                        {room.description}
                    </div>
                    <div
                        className="md:w-1/3"
                        onClick={() => bookNow(room.id, room.name)}
                    >
                        <ButtonComponent text="Book Now" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDescriptionComponent;
