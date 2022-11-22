export abstract class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidPassword extends CustomError {
  constructor(){
    super(401, "Invalid password");
  }
}

export class InvalidName extends CustomError {
  constructor() {
    super(400, "Nome inválido");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(400, "Email inválido");
  }
}

export class InvalidRole extends CustomError {
  constructor() {
    super(400, "Cargo inválido");
  }
}

export class UserNotFound extends CustomError {
  constructor() {
    super(404, "Usuário não encontrado");
  }
}

export class Unauthorized extends CustomError {
  constructor() {
    super(401, "Usuário não autorizado");
  }
}

export class InvalidUser extends CustomError {
  constructor() {
    super(400, "Usuário já existe");
  }

}