import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import BookingComponent from "../components/BookingComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate, useSearchParams } from "react-router-dom";

const RoomAvailability = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const roomsCollectionRef = collection(db, "rooms");

    const [date, setDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const props = {
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        searchParams,
        setSearchParams,
    };

    useEffect(() => {
        const getRooms = async () => {
            const data = await getDocs(roomsCollectionRef);
            setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getRooms();

        setDate(searchParams.get("date"));
        setStartTime(searchParams.get("startTime"));
        setEndTime(searchParams.get("endTime"));
    }, [searchParams]);

    const bookNow = (id, name) => {
        navigate(
            `/book?date=${date}&startTime=${startTime}&endTime=${endTime}&roomId=${id}&roomName=${name}`
        );
    };

    return (
        <div>
            <div className="mb-20">
                <BookingComponent {...props} />
            </div>

            <div className="bg-plotco-yellow rounded-xl p-8 lg:p-16 w-4/5 mx-auto grid grid-rows-3 gap-8 mb-20">
                {rooms.map((room, i) => {
                    return (
                        <div
                            className="bg-white rounded-xl p-8 lg:p-10 flex flex-col lg:flex-row justify-center items-center"
                            key={i}
                        >
                            <img
                                src={room.img}
                                alt={room.name}
                                className="w-1/2 mb-3 lg:mb-0 lg:w-1/4 mr-6"
                            />
                            <div className="lg:grid lg:grid-cols-4 items-center">
                                <div className="flex flex-col mb-3 lg:mb-0 text-left col-span-3 mr-6">
                                    <div className="text-base lg:text-lg">
                                        {room.name}
                                    </div>
                                    <div className="text-sm lg:text-base font-proxima font-normal">
                                        {room.description}
                                    </div>
                                </div>

                                <div
                                    className=""
                                    onClick={() => bookNow(room.id, room.name)}
                                >
                                    <ButtonComponent text="Book Now" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoomAvailability;
