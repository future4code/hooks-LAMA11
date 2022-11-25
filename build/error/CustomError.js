"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDay = exports.InvalidSchedule = exports.InvalidCredentials = exports.InvalidShow = exports.InvalidBand = exports.InvalidUser = exports.Unauthorized = exports.UserNotFound = exports.InvalidRole = exports.InvalidEmail = exports.InvalidName = exports.InvalidPassword = exports.InvalidRequest = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
    }
}
exports.CustomError = CustomError;
class InvalidRequest extends CustomError {
    constructor() {
        super(422, "Complete all the fields correctly!");
    }
}
exports.InvalidRequest = InvalidRequest;
class InvalidPassword extends CustomError {
    constructor() {
        super(401, "Invalid password");
    }
}
exports.InvalidPassword = InvalidPassword;
class InvalidName extends CustomError {
    constructor() {
        super(400, "Invalid name");
    }
}
exports.InvalidName = InvalidName;
class InvalidEmail extends CustomError {
    constructor() {
        super(400, "Invalid email");
    }
}
exports.InvalidEmail = InvalidEmail;
class InvalidRole extends CustomError {
    constructor() {
        super(400, "Invalid role");
    }
}
exports.InvalidRole = InvalidRole;
class UserNotFound extends CustomError {
    constructor() {
        super(404, "User not found");
    }
}
exports.UserNotFound = UserNotFound;
class Unauthorized extends CustomError {
    constructor() {
        super(401, "Unauthorized user");
    }
}
exports.Unauthorized = Unauthorized;
class InvalidUser extends CustomError {
    constructor() {
        super(400, "User already exists");
    }
}
exports.InvalidUser = InvalidUser;
class InvalidBand extends CustomError {
    constructor() {
        super(400, "Band already exists");
    }
}
exports.InvalidBand = InvalidBand;
class InvalidShow extends CustomError {
    constructor() {
        super(400, "Invalid show");
    }
}
exports.InvalidShow = InvalidShow;
class InvalidCredentials extends CustomError {
    constructor() {
        super(400, "Invalid credentials");
    }
}
exports.InvalidCredentials = InvalidCredentials;
class InvalidSchedule extends CustomError {
    constructor() {
        super(400, "invalid schedule");
    }
}
exports.InvalidSchedule = InvalidSchedule;
class InvalidDay extends CustomError {
    constructor() {
        super(400, "invalid day");
    }
}
exports.InvalidDay = InvalidDay;
