import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
  new IdGenerator(),
  new Authenticator(),
  new HashManager(),
  new UserDatabase()
);

export class UserController {
  public signup = async (req: Request, res: Response) => {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };

      const token = await userBusiness.createUser(input);

      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const token = await userBusiness.login(input);

      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  };
}
