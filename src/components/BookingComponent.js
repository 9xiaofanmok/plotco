import { DatePicker, TimePicker } from "antd";
import { db } from "../utils/firebase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

const BookingComponent = ({
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
}) => {
    let navigate = useNavigate();

    const [disableBtn, setDisableBtn] = useState(true);

    useEffect(() => {
        if (date && startTime && endTime) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    }, [date, startTime, endTime]);

    const checkAvail = async () => {
        navigate(
            `/check-avail?date=${date}&startTime=${startTime}&endTime=${endTime}`
        );
    };

    return (
        <div className=" w-4/5 mx-auto">
            <div className="text-white text-lg mb-4 text-left">Book A Room</div>

            <div className="rounded-xl bg-white shadow-xl p-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
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
                            Time
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
                    <div className="h-1/2 self-center" onClick={checkAvail}>
                        <ButtonComponent
                            text="Check Availability"
                            disabled={disableBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;
