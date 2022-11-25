import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "LAMA_BANDS";
  private static dataModel(data?: any) {
    return (
      data && new Band(data.id, data.name, data.music_genre, data.responsible)
    );
  }

  public createBand = async (band: Band): Promise<void> => {
    try {
      await this.getConnection().insert({ band }).into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAllBands = async (): Promise<Band[]> => {
    try {
      const result = await this.getConnection()
        .select()
        .from(BandDatabase.TABLE_NAME);

      const bands: Band[] = [];

      for (let data of result) {
        bands.push(await BandDatabase.dataModel(data));
      }

      return bands;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getBandById = async (id: string): Promise<Band> => {
    try {
      const result = await this.getConnection()
        .select()
        .from(BandDatabase.TABLE_NAME)
        .where({ id });
      return BandDatabase.dataModel(result);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
