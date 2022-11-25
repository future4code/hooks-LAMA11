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
exports.ShowDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ShowDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createShow = (show) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().insert(show).into(ShowDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
        this.showExists = (weekDay, startTime, endTime) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select(ShowDatabase.TABLE_NAME)
                    .where({ week_day: weekDay })
                    .andWhere("start_time", "<", endTime)
                    .andWhere("end_time", ">", startTime);
                if (result.length > 0) {
                    return true;
                }
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
        this.getShowByDay = (weekDay) => __awaiter(this, void 0, void 0, function* () {
            try {
                const show = yield this.getConnection().raw(`
        SELECT LAMA_BANDS.name as bandName, LAMA_BANDS.music_genre as musicGenre
        FROM LAMA_SHOWS
        LEFT JOIN LAMA_BANDS
        ON LAMA_SHOWS.band_id = LAMA_BANDS.id
        WHERE LAMA_SHOWS.week_day = "${weekDay}"
        ORDER BY LAMA_SHOWS.start_time ASC;
        `);
                return show[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.ShowDatabase = ShowDatabase;
ShowDatabase.TABLE_NAME = "LAMA_SHOWS";
