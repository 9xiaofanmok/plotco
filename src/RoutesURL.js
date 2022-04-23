import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const RoutesURL = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="/booking-avail" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default RoutesURL;
