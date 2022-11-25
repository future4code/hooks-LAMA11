import { ShowDatabase } from "../data/ShowDatabase";
import {
  CustomError,
  InvalidDay,
  InvalidSchedule,
  InvalidShow,
} from "../error/CustomError";
import { createShowDto, Shows } from "../model/Shows";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private showDatabase: ShowDatabase
  ) {}

  public createShow = async (
    input: createShowDto,
    token: string
  ): Promise<any> => {
    try {
      this.authenticator.getData(token);

      if (
        !input.weekDay ||
        !input.startTime ||
        !input.endTime ||
        !input.bandId
      ) {
        throw new CustomError(400, "Please fill in all the required fields");
      }

      if (input.weekDay) {
        Shows.weekDays(input.weekDay);
      }

      if (input.startTime % 1 === 0 || input.endTime % 1 === 0) {
        throw new InvalidSchedule();
      }

      if (input.startTime >= input.endTime) {
        throw new InvalidSchedule();
      }

      if (input.startTime < 8 || input.endTime > 23) {
        throw new InvalidSchedule();
      }

      const showAlreadyExist = await this.showDatabase.showExists(
        input.weekDay,
        input.startTime,
        input.endTime
      );

      if (showAlreadyExist) {
        throw new InvalidShow();
      }

      const id = this.idGenerator.generate();

      const newShow = new Shows(
        id,
        Shows.weekDays(input.weekDay),
        input.startTime,
        input.endTime,
        input.bandId
      );

      await this.showDatabase.createShow(newShow);
    } catch (error: any) {
      throw new CustomError(
        error.message || error.sqlMessage,
        error.statusCode
      );
    }
  };

  public getShowByDay = async (token:string, weekDay:string) =>{
    try {
        this.authenticator.getData(token)

        if(!weekDay){
            throw new InvalidDay()
        }

        if(weekDay){
            Shows.weekDays(weekDay)
        }

        const shows = await this.showDatabase.getShowByDay(weekDay)
    } catch (error:any) {
        throw new CustomError(
            error.message || error.sqlMessage,
            error.statusCode
          );
    }

  }

}
