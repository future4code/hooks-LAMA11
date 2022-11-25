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
exports.BandDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Band_1 = require("../model/Band");
class BandDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createBand = (band) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().insert({ band }).into(BandDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
        this.getAllBands = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select()
                    .from(BandDatabase.TABLE_NAME);
                const bands = [];
                for (let data of result) {
                    bands.push(yield BandDatabase.dataModel(data));
                }
                return bands;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
        this.getBandById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select()
                    .from(BandDatabase.TABLE_NAME)
                    .where({ id });
                return BandDatabase.dataModel(result);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    static dataModel(data) {
        return (data && new Band_1.Band(data.id, data.name, data.music_genre, data.responsible));
    }
}
exports.BandDatabase = BandDatabase;
BandDatabase.TABLE_NAME = "LAMA_BANDS";
