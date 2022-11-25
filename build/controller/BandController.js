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
exports.BandController = void 0;
const BandBusiness_1 = require("../business/BandBusiness");
const BandDatabase_1 = require("../data/BandDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const bandBusiness = new BandBusiness_1.BandBusiness(new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator(), new BandDatabase_1.BandDatabase());
class BandController {
    constructor() {
        this.createBand = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const input = {
                    name: req.body.name,
                    music_genre: req.body.music_genre,
                    responsible: req.body.responsible,
                };
                const result = yield bandBusiness.createBand(input, token);
                res.status(201).send({ result });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ message: error.message });
            }
        });
        this.getBandById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { id } = req.query;
                const result = yield bandBusiness.getBandById(token, id);
                res.status(200).send({ result });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ message: error.message });
            }
        });
    }
}
exports.BandController = BandController;
