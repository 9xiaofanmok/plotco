import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";
import {
    doc,
    getDoc,
    addDoc,
    collection,
    Firestore,
    setDoc,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { DatePicker, TimePicker, Input } from "antd";
import moment from "moment";
import ButtonComponent from "../components/ButtonComponent";
const { TextArea } = Input;

const BookRoom = () => {
    const [searchParams] = useSearchParams();

    const [date, setDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [roomName, setRoomName] = useState();
    const [room, setRoom] = useState();
    const [emails, setEmails] = useState();

    useEffect(() => {
        setDate(searchParams.get("date"));
        setStartTime(searchParams.get("startTime"));
        setEndTime(searchParams.get("endTime"));
        setRoomName(searchParams.get("roomName"));
        const roomId = searchParams.get("roomId");

        if (roomId) {
            console.log(roomId);
            const roomCollectionRef = doc(db, "rooms", roomId);
            const getRoom = async () => {
                const data = await getDoc(roomCollectionRef);
                setRoom(data.data());
            };

            getRoom();
        }
    }, [searchParams]);

    const [disableBtn, setDisableBtn] = useState(true);

    useEffect(() => {
        if (date && startTime && endTime && emails) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    }, [date, startTime, endTime, emails]);

    const createBooking = async () => {
        try {
            console.log({
                date,
                startTime,
                endTime,
                emails,
            });

            if (searchParams.get("roomId"))
                await addDoc(
                    collection(
                        db,
                        "rooms",
                        searchParams.get("roomId"),
                        "bookings"
                    ),
                    {
                        date,
                        startTime,
                        endTime,
                        emails,
                    }
                );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-4/5 mx-auto my-10 lg:my-16">
            <div className="text-xl lg:text-2xl text-left mb-5">
                Make your booking: {roomName}
            </div>
            <div className="text-left text-sm lg:text-base font-proxima font-normal mb-5">
                *Currently, there is a limited capacity of 15 users in each
                room, additional users that join the room will only be able to
                spectatate what is going on in the room. Each room fills up at a
                first come first serve basis.
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-5">
                <img
                    src={room ? room.img : ""}
                    alt={roomName}
                    className="mb-2 md:mb-0"
                />

                <div className="rounded-xl bg-white shadow-xl p-10">
                    <div className="grid grid-cols-1 gap-6 text-left">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <div className="flex items-center justify-center">
                                <div
                                    className="datepicker relative form-floating mb-3 w-full"
                                    data-mdb-toggle-button="false"
                                >
                                    <DatePicker
                                        className="w-full h-11"
                                        disabledDate={(current) =>
                                            current &&
                                            current < moment().startOf("day")
                                        }
                                        onChange={(date, dateString) => {
                                            setDate(dateString);
                                        }}
                                        value={date ? moment(date) : null}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                            </label>
                            <div className="flex justify-center">
                                <div className="timepicker relative form-floating mb-3 w-full">
                                    <TimePicker
                                        className="w-full h-11"
                                        onChange={(date, dateString) => {
                                            setStartTime(dateString);
                                        }}
                                        format="h:mm a"
                                        minuteStep={30}
                                        value={
                                            startTime
                                                ? moment(startTime, "h:mm a")
                                                : null
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time
                            </label>
                            <div className="flex justify-center">
                                <div className="timepicker relative form-floating mb-3 w-full">
                                    <TimePicker
                                        className="w-full h-11"
                                        onChange={(date, dateString) => {
                                            setEndTime(dateString);
                                        }}
                                        format="h:mm a"
                                        minuteStep={30}
                                        value={
                                            endTime
                                                ? moment(endTime, "h:mm a")
                                                : null
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email of attendee(s)
                            </label>
                            <div className="flex justify-center">
                                <div className="emails relative form-floating mb-3 w-full">
                                    <ReactMultiEmail
                                        emails={emails}
                                        onChange={(_emails) => {
                                            setEmails(_emails);
                                        }}
                                        validateEmail={(email) => {
                                            return (
                                                isEmail(email) &&
                                                email.endsWith(
                                                    "@singaporeair.com.sg"
                                                )
                                            ); // return boolean
                                        }}
                                        getLabel={(
                                            email,
                                            index,
                                            removeEmail
                                        ) => {
                                            return (
                                                <div data-tag key={index}>
                                                    {email}
                                                    <span
                                                        data-tag-handle
                                                        onClick={() =>
                                                            removeEmail(index)
                                                        }
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className="h-1/2 self-center"
                            onClick={createBooking}
                        >
                            <ButtonComponent
                                text="Book Now"
                                disabled={disableBtn}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookRoom;
