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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const UserDatabase_1 = require("../data/UserDatabase");
const userBusiness = new UserBusiness_1.UserBusiness(new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator(), new HashManager_1.HashManager(), new UserDatabase_1.UserDatabase());
class UserController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = req.body;
                const input = {
                    name,
                    email,
                    password,
                    role
                };
                const token = yield userBusiness.createUser(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    password: req.body.password,
                };
                const token = yield userBusiness.login(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.UserController = UserController;
