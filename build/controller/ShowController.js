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
exports.ShowController = void 0;
const ShowBusiness_1 = require("../business/ShowBusiness");
const ShowDatabase_1 = require("../data/ShowDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const showBusiness = new ShowBusiness_1.ShowBusiness(new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator(), new ShowDatabase_1.ShowDatabase());
class ShowController {
    constructor() {
        this.createShow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const input = {
                    weekDay: req.body.weekDay,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    bandId: req.body.bandId,
                };
                const result = yield this.showBusiness.createShow(token, input);
                res.status(200).send({ result });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ message: error.message });
            }
        });
        this.getShowByDay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const weekDay = req.body.weekDay;
                const show = yield this.showBusiness.getShowByDay(token, weekDay);
                res.status(200).send({ show });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ message: error.message });
            }
        });
    }
}
exports.ShowController = ShowController;
