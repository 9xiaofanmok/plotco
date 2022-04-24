import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";
import {
    doc,
    getDoc,
    addDoc,
    collection,
    query,
    getDocs,
    where,
} from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DatePicker, TimePicker, Input } from "antd";
import moment from "moment";
import ButtonComponent from "../components/ButtonComponent";

const BookRoom = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(false);

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
            // check if room's booking has clashing time
            let clashingBooking = false;

            if (date) {
                const q = query(
                    collection(
                        db,
                        "rooms",
                        searchParams.get("roomId"),
                        "bookings"
                    ),
                    where("date", "==", date)
                );

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const booking = doc.data();
                    console.log(booking);

                    const startTime24 = moment(startTime, ["h:mm A"]).format(
                        "HH:mm"
                    );
                    const endTime24 = moment(endTime, ["h:mm A"]).format(
                        "HH:mm"
                    );
                    console.log(`booking start time: ${booking.startTime}`);
                    console.log(`start time: ${startTime24}`);
                    console.log(`booking end time: ${booking.endTime}`);
                    console.log(`end time: ${endTime24}`);
                    if (
                        (booking.startTime <= startTime24 &&
                            booking.endTime >= endTime24) ||
                        (booking.startTime >= startTime24 &&
                            booking.endTime >= endTime24) ||
                        (booking.startTime >= startTime24 &&
                            booking.endTime >= endTime24) ||
                        (booking.startTime >= startTime24 &&
                            booking.endTime <= endTime24)
                    ) {
                        console.log("yes");
                        setErrorMsg(true);
                        setDisableBtn(true);
                        clashingBooking = true;
                    }
                });

                if (!clashingBooking) {
                    setErrorMsg(false);
                    console.log(moment(endTime, ["h:mm A"]).format("HH:mm"));
                    setStartTime(moment(startTime, ["h:mm A"]).format("HH:mm"));
                    setEndTime(moment(endTime, ["h:mm A"]).format("HH:mm"));
                    const newBooking = {
                        roomId: searchParams.get("roomId"),
                        date,
                        startTime: moment(startTime, ["h:mm A"]).format(
                            "HH:mm"
                        ),
                        endTime: moment(endTime, ["h:mm A"]).format("HH:mm"),
                        emails,
                    };

                    if (searchParams.get("roomId")) {
                    }
                    await addDoc(
                        collection(
                            db,
                            "rooms",
                            searchParams.get("roomId"),
                            "bookings"
                        ),
                        newBooking
                    );

                    navigate("/thankyou");
                }
            }
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
                        {errorMsg ? (
                            <div className="text-plotco-red font-normal font-proxima">
                                This date and time is not available, please
                                choose another slot
                            </div>
                        ) : (
                            ""
                        )}
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
                                    <TimePicker.RangePicker
                                        className="w-full h-11"
                                        onChange={(dates, dateStrings) => {
                                            setStartTime(dateStrings[0]);
                                            setEndTime(dateStrings[1]);
                                        }}
                                        format="h:mm a"
                                        minuteStep={30}
                                        value={[
                                            startTime
                                                ? moment(startTime, "h:mm a")
                                                : null,
                                            endTime
                                                ? moment(endTime, "h:mm a")
                                                : null,
                                        ]}
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
