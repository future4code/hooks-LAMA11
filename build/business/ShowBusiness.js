"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const Shows_1 = require("../model/Shows");
class ShowBusiness {
    constructor(idGenerator, authenticator, showDatabase) {
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.showDatabase = showDatabase;
        this.createShow = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.authenticator.getData(token);
                if (!input.weekDay ||
                    !input.startTime ||
                    !input.endTime ||
                    !input.bandId) {
                    throw new CustomError_1.CustomError(400, "Please fill in all the required fields");
                }
                if (input.weekDay) {
                    Shows_1.Shows.weekDays(input.weekDay);
                }
                if (input.startTime % 1 === 0 || input.endTime % 1 === 0) {
                    throw new CustomError_1.InvalidSchedule();
                }
                if (input.startTime >= input.endTime) {
                    throw new CustomError_1.InvalidSchedule();
                }
                if (input.startTime < 8 || input.endTime > 23) {
                    throw new CustomError_1.InvalidSchedule();
                }
                const showAlreadyExist = yield this.showDatabase.showExists(input.weekDay, input.startTime, input.endTime);
                if (showAlreadyExist) {
                    throw new CustomError_1.InvalidShow();
                }
                const id = this.idGenerator.generate();
                const newShow = new Shows_1.Shows(id, Shows_1.Shows.weekDays(input.weekDay), input.startTime, input.endTime, input.bandId);
                yield this.showDatabase.createShow(newShow);
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message || error.sqlMessage, error.statusCode);
            }
        });
        this.getShowByDay = (token, weekDay) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.authenticator.getData(token);
                if (!weekDay) {
                    throw new CustomError_1.InvalidDay();
                }
                if (weekDay) {
                    Shows_1.Shows.weekDays(weekDay);
                }
                const shows = yield this.showDatabase.getShowByDay(weekDay);
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message || error.sqlMessage, error.statusCode);
            }
        });
    }
}
exports.ShowBusiness = ShowBusiness;
