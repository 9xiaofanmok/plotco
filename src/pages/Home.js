import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import BookingComponent from "../components/BookingComponent";
import ButtonComponent from "../components/ButtonComponent";
import RoomDescriptionComponent from "../components/RoomDescriptionComponent";
import FaqComponent from "../components/FaqComponent";

const Home = () => {
    const [rooms, setRooms] = useState([]);
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
    };

    const roomsCollectionRef = collection(db, "rooms");

    useEffect(() => {
        const getRooms = async () => {
            const data = await getDocs(roomsCollectionRef);
            setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getRooms();
    }, []);

    return (
        <div>
            <div className="bg-plotco-yellow pb-5 lg:pb-10">
                <div className="w-4/5 lg:w-1/2 mx-auto py-10 lg:py-32">
                    <div className="mb-8">
                        <div className="text-2xl md:text-3xl lg:text-6xl text-white mb-5">
                            Stay{" "}
                            <span className="text-plotco-blue">Connected</span>{" "}
                            With Your Coworkers.
                        </div>
                        <div className="text-sm lg:text-base font-proxima font-normal text-white md:w-2/3 mx-auto">
                            Hang out, grab a lunch or conduct your work meetings
                            in our rooms with your colleagues today
                        </div>
                    </div>

                    <a href="#Rooms">
                        <div className="w-1/2 mx-auto">
                            <ButtonComponent text="View Our Rooms" />
                        </div>
                    </a>
                </div>
                <BookingComponent {...props} />
            </div>
            <div id="Rooms" className="pt-1 md:pt-10">
                <div className="text-lg lg:text-2xl mt-10">Our Rooms</div>
                {rooms.map((room) => {
                    return (
                        <RoomDescriptionComponent room={room} key={room.id} />
                    );
                })}
            </div>

            <div className="w-2/3 mx-auto mb-24" id="FAQs">
                <div className="text-lg lg:text-2xl mb-5 lg:mb-10">
                    Frequently Asked Questions
                </div>
                <FaqComponent
                    title="What is PLOTCO?"
                    description="The shift to remote work has changed the way people interact with one another in organisations. While there is an increase in meetings through online platforms, informal interactions and casual chitchats have decreased over the past 2 years. 
PLOTCO is here to help. We have a variety of rooms, each with a different purpose and environment that will allow you to sit down with your coworkers and enjoy a friendly Friday evening catching up with one another. You can also organise team events such as movie nights to bond with team members and get a chance to better know one another. We are not just limited to casual events, feel free to book a meeting room for your next weekly team meeting."
                />
                <FaqComponent
                    title="Is this free for anyone?"
                    description="PLOTCO is currently built for Singapore Airlines (SIA) staff only as part of a Hackathon project. But yes, it is free for all SIA staff, just input your SIA email when booking the room to obtain a slot!"
                />
                <FaqComponent
                    title="How many people can join the room?"
                    description="Currently, there is a limited capacity of 15 users in each room, additional users that join the room will only be able to spectatate what is going on in the room. Each room fills up at a first come first serve basis."
                />
                <FaqComponent
                    title="What devices can I use to join?"
                    description="PLOTCO uses FRAME, which is a platform that allows people to communicate and collaborate in a 3D space. You can access FRAME using a browser on desktop, mobile or even VR."
                />
                <FaqComponent
                    title="How do I invite my colleagues to join the room?"
                    description="When booking the room, you will be asked to key in the emails of your colleagues. An invite will then be sent to their emails where they can easily add the event to their calendars."
                />
            </div>
        </div>
    );
};

export default Home;
