"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showDays = exports.Shows = void 0;
const CustomError_1 = require("../error/CustomError");
class Shows {
    constructor(id, weekDay, startTime, endTime, bandId) {
        this.id = id;
        this.weekDay = weekDay;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bandId = bandId;
    }
    static weekDays(input) {
        switch (input.toUpperCase()) {
            case "FRIDAY":
                return showDays.FRIDAY;
            case "SATURDAY":
                return showDays.SATURDAY;
            case "SUNDAY":
                return showDays.SUNDAY;
            default:
                throw new CustomError_1.InvalidShow();
        }
    }
}
exports.Shows = Shows;
var showDays;
(function (showDays) {
    showDays["FRIDAY"] = "FRIDAY";
    showDays["SATURDAY"] = "SATURDAY";
    showDays["SUNDAY"] = "SUNDAY";
})(showDays = exports.showDays || (exports.showDays = {}));
