import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
// import { Form, Button, DatePicker, TimePicker } from "antd";

const BookingComponent = () => {
    const [date, setDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [disableBtn, setDisableBtn] = useState(true);

    useEffect(() => {
        if (date && startTime && endTime) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    }, [date, startTime, endTime]);

    return (
        <div className=" w-4/5 mx-auto">
            <div className="text-white text-lg mb-4 text-left">Book A Room</div>

            <div className="rounded-xl bg-white shadow-xl p-10">
                <form action="#">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
                        <div>
                            <label
                                for="date"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
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
                                            current < moment().endOf("day")
                                        }
                                        onChange={(date, dateString) => {
                                            setDate(dateString);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                for="startTime"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Start Time
                            </label>
                            <div className="flex justify-center">
                                <div className="timepicker relative form-floating mb-3 w-full">
                                    <TimePicker
                                        className="w-full h-11"
                                        onChange={(date, dateString) => {
                                            setStartTime(dateString);
                                        }}
                                        format="HH:mm"
                                        minuteStep={30}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                for="endTime"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                End Time
                            </label>
                            <div className="flex justify-center">
                                <div className="timepicker relative form-floating mb-3 w-full">
                                    <TimePicker
                                        className="w-full h-11"
                                        onChange={(date, dateString) => {
                                            setEndTime(dateString);
                                        }}
                                        format="HH:mm"
                                        minuteStep={30}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-1/2 self-center cursor-pointer">
                            <ButtonComponent
                                text="Check Availability"
                                disabled={disableBtn}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingComponent;
