import React from "react";
import ButtonComponent from "./ButtonComponent";
// import { Form, Button, DatePicker, TimePicker } from "antd";

const BookingComponent = () => {
    // const [form] = Form.useForm();

    return (
        <div className=" w-4/5 mx-auto">
            <div className="text-white text-lg mb-4 text-left">Book A Room</div>

            <div className="rounded-xl bg-white shadow-xl p-10">
                {/* <Form layout="horizontal" form={form}>
                    <Form.Item label="Date">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Start Time">
                        <TimePicker />
                    </Form.Item>
                    <Form.Item label="End Time">
                        <TimePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </Form> */}

                <form action="#">
                    <div className="grid grid-cols-4 gap-6 text-left">
                        <div>
                            <label
                                for="date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Date
                            </label>
                            {/* <input
                                type="text"
                                name="date"
                                id="date"
                                className="mt-1 focus:ring-plotco-blue focus:border-plotco-blue block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md p-3"
                            /> */}
                            <div className="flex items-center justify-center">
                                <div
                                    className="datepicker relative form-floating mb-3 xl:w-96"
                                    data-mdb-toggle-button="false"
                                >
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-plotco-blue focus:outline-none"
                                        placeholder="Select a date"
                                        data-mdb-toggle="datepicker"
                                    />
                                    <label
                                        for="floatingInput"
                                        className="text-gray-700"
                                    >
                                        Select a date
                                    </label>
                                    <button
                                        className="datepicker-toggle-button"
                                        data-mdb-toggle="datepicker"
                                    >
                                        <i className="fas fa-calendar datepicker-toggle-icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                for="startTime"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Start Time
                            </label>
                            <div className="flex justify-center">
                                <div className="timepicker relative form-floating mb-3 xl:w-96">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Select a time"
                                        data-mdb-toggle="input-toggle-timepicker"
                                    />
                                    <label
                                        for="floatingInput"
                                        className="text-gray-700"
                                    >
                                        Select a time
                                    </label>
                                </div>
                            </div>
                            {/* <input
                                type="text"
                                name="startTime"
                                id="startTime"
                                className="mt-1 focus:ring-plotco-blue focus:border-plotco-blue block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md p-3"
                            /> */}
                        </div>

                        <div>
                            <label
                                for="endTime"
                                className="block text-sm font-medium text-gray-700"
                            >
                                End Time
                            </label>
                            <div className="flex justify-center">
                                <div className="timepicker relative form-floating mb-3 xl:w-96">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Select a time"
                                        data-mdb-toggle="input-toggle-timepicker"
                                    />
                                    <label
                                        for="floatingInput"
                                        className="text-gray-700"
                                    >
                                        Select a time
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="h-1/2 self-center">
                            <ButtonComponent text="Check Availability" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingComponent;
