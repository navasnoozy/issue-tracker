"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFormatedTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return formattedTime;
};
exports.default = getFormatedTime;
