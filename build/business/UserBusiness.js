"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserBusiness = void 0;
const User_1 = require("../model/User");
const E = __importStar(require("../error/CustomError"));
class UserBusiness {
    constructor(idGenerator, authenticator, hashManager, userDatabase) {
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.hashManager = hashManager;
        this.userDatabase = userDatabase;
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user.name || user.email || !user.password) {
                    throw new E.InvalidRequest();
                }
                if (user.password.length < 8) {
                    throw new E.InvalidPassword();
                }
                if (user.email.indexOf("@") === -1) {
                    throw new E.InvalidEmail();
                }
                const id = this.idGenerator.generate();
                const hashPassword = yield this.hashManager.hash(user.password);
                const newUser = new User_1.User(id, user.name, user.email, hashPassword, User_1.User.stringToUserRole(user.role));
                yield this.userDatabase.createUser(newUser);
                const accessToken = this.authenticator.generateToken({
                    id,
                    role: user.role,
                });
                return accessToken;
            }
            catch (error) {
                if (error.message.includes("key", "email")) {
                    throw new E.InvalidEmail();
                }
                throw new E.CustomError(error.message || error.sqlMessage, error.statusCode);
            }
        });
        this.login = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user.email || !user.password) {
                    throw new E.InvalidRequest();
                }
                const userFromDB = yield this.userDatabase.login(user.email);
                if (!user) {
                    throw new E.InvalidCredentials();
                }
                const hashCompare = yield this.hashManager.compare(user.password, userFromDB.getPassword());
                if (!hashCompare) {
                    throw new E.InvalidCredentials();
                }
                const accessToken = this.authenticator.generateToken({
                    id: userFromDB.getId(),
                    role: userFromDB.getRole(),
                });
                return accessToken;
            }
            catch (error) {
                throw new E.CustomError(error.message || error.sqlMessage, error.statusCode);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
