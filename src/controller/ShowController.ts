import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDatabase";
import { createShowDto } from "../model/Shows";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const showBusiness = new ShowBusiness(
  new IdGenerator(),
  new Authenticator(),
  new ShowDatabase()
);

export class ShowController {
  public createShow = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const input: createShowDto = {
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        bandId: req.body.bandId,
      };

      const result = await this.showBusiness.createShow(token, input);
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getShowByDay = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const weekDay = req.body.weekDay;
      const show = await this.showBusiness.getShowByDay(token, weekDay as string);

      res.status(200).send({ show });
    } catch (error: any) {
        res.status(error.statusCode || 400).send({ message: error.message });
    }
  };
  showBusiness: any;
}
