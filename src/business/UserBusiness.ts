import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import * as E from '../error/CustomError'


export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private userDatabase: UserDatabase
  ) {}

  public createUser = async (user: UserInputDTO) => {
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
      const hashPassword = await this.hashManager.hash(user.password);

      const newUser = new User(
        id,
        user.name,
        user.email,
        hashPassword,
        User.stringToUserRole(user.role)
      );

      await this.userDatabase.createUser(newUser);

      const accessToken = this.authenticator.generateToken({
        id,
        role: user.role,
      });

      return accessToken;
    } catch (error: any) {
      if (error.message.includes("key", "email")) {
        throw new E.InvalidEmail();
      }
      throw new E.CustomError(
        error.message || error.sqlMessage,
        error.statusCode
      );
    }
  };

  public login = async (user: LoginInputDTO) => {
    try {
      if (!user.email || !user.password) {
        throw new E.InvalidRequest();
      }

      const userFromDB = await this.userDatabase.login(user.email);

      if (!user) {
        throw new E.InvalidCredentials();
      }

      const hashCompare = await this.hashManager.compare(
        user.password,
        userFromDB.getPassword()
      );

      if (!hashCompare) {
        throw new E.InvalidCredentials();
      }

      const accessToken = this.authenticator.generateToken({
        id: userFromDB.getId(),
        role: userFromDB.getRole(),
      });

      return accessToken;
    } catch (error: any) {
      throw new E.CustomError(
        error.message || error.sqlMessage,
        error.statusCode
      );
    }
  };
}
