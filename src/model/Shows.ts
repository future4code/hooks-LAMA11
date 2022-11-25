import { InvalidShow } from "../error/CustomError";

export class Shows {
  constructor(
    public readonly id: string,
    public readonly weekDay: string,
    public readonly startTime: number,
    public readonly endTime: number,
    public readonly bandId: string
  ) {}

  static weekDays(input: string) {
    switch (input.toUpperCase()) {
      case "FRIDAY":
        return showDays.FRIDAY;
      case "SATURDAY":
        return showDays.SATURDAY;
      case "SUNDAY":
        return showDays.SUNDAY;
      default:
        throw new InvalidShow();
    }
  }
}

export interface createShowDto {
  weekDay: string;
  startTime: number;
  endTime: number;
  bandId: string;
}

export enum showDays {
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}
