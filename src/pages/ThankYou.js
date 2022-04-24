import React from "react";

const ThankYou = () => {
    return (
        <div className="w-4/5 lg:w-2/3 mx-auto bg-plotco-blue my-16 p-10 text-left text-white rounded-xl mb-96">
            <div className="text-lg lg:text-xl mb-4">
                Your Booking Has Been Made Successfully!
            </div>
            <div className="text-sm lg:text-base font-normal">
                An email invite has been sent to all attendees. Do join in
                through the link.
                <br />
                See you in the Metaverse!
            </div>
        </div>
    );
};

export default ThankYou;
