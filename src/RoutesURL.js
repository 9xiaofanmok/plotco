import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomAvailability from "./pages/RoomAvailability";
import BookRoom from "./pages/BookRoom";
import ThankYou from "./pages/ThankYou";

const RoutesURL = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check-avail" element={<RoomAvailability />} />
            <Route path="/book" element={<BookRoom />} />
            <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
    );
};

export default RoutesURL;
