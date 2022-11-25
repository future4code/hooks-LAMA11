import { BandDatabase } from "../data/BandDatabase";
import {
  CustomError,
  InvalidBand,
  InvalidRequest,
  InvalidRole,
} from "../error/CustomError";
import { Band, BandInputDto } from "../model/Band";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private bandDatabase: BandDatabase
  ) {}

  public createBand = async (
    band: BandInputDto,
    token: string
  ): Promise<any> => {
    try {
      if (!band.name || !band.music_genre || !band.responsible) {
        throw new InvalidRequest();
      }

      const authentication: AuthenticationData =
        this.authenticator.getData(token);

      if (authentication.role !== "ADMIN") {
        throw new InvalidRole();
      }

      const bands = await this.bandDatabase.getAllBands();
      const bandAlreadyExists =
        bands && bands.find((item) => item.name === band.name);

      if (bandAlreadyExists) {
        throw new InvalidBand();
      }

      const id = this.idGenerator.generate();

      const newBand = new Band(
        id,
        band.name,
        band.music_genre,
        band.responsible
      );

      await this.bandDatabase.createBand(newBand);

      return newBand;
    } catch (error: any) {
      throw new CustomError(
        error.message || error.sqlMessage,
        error.statusCode
      );
    }
  };

  public getBandById = async (token: string, id: string): Promise<Band> => {
    try {
      this.authenticator.getData(token);
      const band = this.bandDatabase.getBandById(id);

      if (!band) {
        throw new InvalidBand();
      } else {
        return band;
      }
    } catch (error: any) {
      throw new CustomError(
        error.message || error.sqlMessage,
        error.statusCode
      );
    }
  };
}
