import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDto } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const bandBusiness = new BandBusiness(
  new IdGenerator(),
  new Authenticator(),
  new BandDatabase(),
);

export class BandController {
  public createBand = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const input: BandInputDto = {
        name: req.body.name,
        music_genre: req.body.music_genre,
        responsible: req.body.responsible,
      };

      const result = await bandBusiness.createBand(input, token);
      res.status(201).send({ result });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getBandById = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;
      const { id } = req.query;
      const result = await bandBusiness.getBandById(token, id as string);

      res.status(200).send({ result });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };
}
