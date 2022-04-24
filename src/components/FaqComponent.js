import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FaqComponent = ({ title, description }) => {
    const [hide, setHide] = useState(true);

    const toggleHide = () => {
        setHide(!hide);
    };

    return (
        <div className="px-8 py-6 border rounded-xl mb-3">
            <div className="flex flex-col text-left">
                <div
                    onClick={toggleHide}
                    className={`${
                        hide ? "" : "mb-4"
                    } flex justify-between items-center cursor-pointer`}
                >
                    <div>{title}</div>
                    {hide ? (
                        <FontAwesomeIcon icon={faPlus} />
                    ) : (
                        <FontAwesomeIcon icon={faMinus} />
                    )}
                </div>
                {hide ? (
                    ""
                ) : (
                    <div className="font-normal pr-10">{description}</div>
                )}
            </div>
        </div>
    );
};

export default FaqComponent;
