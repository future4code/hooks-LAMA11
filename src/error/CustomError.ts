export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidRequest extends CustomError {
  constructor() {
    super(422, "Complete all the fields correctly!");
  }
}

export class InvalidPassword extends CustomError {
  constructor() {
    super(401, "Invalid password");
  }
}

export class InvalidName extends CustomError {
  constructor() {
    super(400, "Invalid name");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(400, "Invalid email");
  }
}

export class InvalidRole extends CustomError {
  constructor() {
    super(400, "Invalid role");
  }
}

export class UserNotFound extends CustomError {
  constructor() {
    super(404, "User not found");
  }
}

export class Unauthorized extends CustomError {
  constructor() {
    super(401, "Unauthorized user");
  }
}

export class InvalidUser extends CustomError {
  constructor() {
    super(400, "User already exists");
  }
}

export class InvalidBand extends CustomError {
  constructor() {
    super(400, "Band already exists");
  }
}

export class InvalidShow extends CustomError {
  constructor() {
    super(400, "Invalid show");
  }
}

export class InvalidCredentials extends CustomError {
  constructor() {
    super(400, "Invalid credentials");
  }
}

export class InvalidSchedule extends CustomError {
  constructor() {
    super(400, "invalid schedule");
  }
}

export class InvalidDay extends CustomError {
  constructor() {
    super(400, "invalid day");
  }
}
