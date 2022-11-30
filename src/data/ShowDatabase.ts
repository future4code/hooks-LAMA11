import { Shows } from "../model/Shows";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "LAMA_SHOWS";

  public createShow = async (show: Shows): Promise<void> => {
    try {
      await this.getConnection().insert(show).into(ShowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public showExists = async (
    weekDay: string,
    startTime: number,
    endTime: number
  ): Promise<any> => {
    try {
      const result = await this.getConnection()
        .select(ShowDatabase.TABLE_NAME)
        .where({ week_day: weekDay })
        .andWhere("start_time", "<", endTime)
        .andWhere("end_time", ">", startTime);

      if (result.length > 0) {
        return true;
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getShowByDay = async (weekDay: string): Promise<boolean> => {
    try {
      const show = await this.getConnection().raw(`
        SELECT LAMA_BANDS.name as bandName, LAMA_BANDS.music_genre as musicGenre
        FROM LAMA_SHOWS
        LEFT JOIN LAMA_BANDS
        ON LAMA_SHOWS.band_id = LAMA_BANDS.id
        WHERE LAMA_SHOWS.week_day = "${weekDay}"
        ORDER BY LAMA_SHOWS.start_time ASC;
        `);
      return show[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
