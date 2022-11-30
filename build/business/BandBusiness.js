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
exports.BandBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const Band_1 = require("../model/Band");
class BandBusiness {
    constructor(idGenerator, authenticator, bandDatabase) {
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.bandDatabase = bandDatabase;
        this.createBand = (band, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!band.name || !band.music_genre || !band.responsible) {
                    throw new CustomError_1.InvalidRequest();
                }
                const authentication = this.authenticator.getData(token);
                if (authentication.role !== "ADMIN") {
                    throw new CustomError_1.InvalidRole();
                }
                const bands = yield this.bandDatabase.getAllBands();
                const bandAlreadyExists = bands && bands.find((item) => item.name === band.name);
                if (bandAlreadyExists) {
                    throw new CustomError_1.InvalidBand();
                }
                const id = this.idGenerator.generate();
                const newBand = new Band_1.Band(id, band.name, band.music_genre, band.responsible);
                yield this.bandDatabase.createBand(newBand);
                return newBand;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message || error.sqlMessage, error.statusCode);
            }
        });
        this.getBandById = (token, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.authenticator.getData(token);
                const band = this.bandDatabase.getBandById(id);
                if (!band) {
                    throw new CustomError_1.InvalidBand();
                }
                else {
                    return band;
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message || error.sqlMessage, error.statusCode);
            }
        });
    }
}
exports.BandBusiness = BandBusiness;
