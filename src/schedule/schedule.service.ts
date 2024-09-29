import { HttpService } from "@nestjs/axios";
import type { MRData as SMRData } from "./schedule.entity";
import { catchError, firstValueFrom, map } from "rxjs";
import { AxiosError } from "axios";

export class ScheduleService {
  constructor(private readonly httpService: HttpService) {}

  async getSchedule() {
    return this.httpService
      .get<{ MRData: SMRData }>(`/${new Date().getFullYear()}.json`)
      .pipe(
        map((response) => response.data.MRData.RaceTable.Races),
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });

          throw "Error getting schedule";
        }),
      );
  }

  async getScheduleForRound(roundNumber: number) {
    return this.httpService
      .get<{ MRData: SMRData }>(
        `${new Date().getFullYear()}/${roundNumber}.json`,
      )
      .pipe(
        map((response) =>
          response.data.MRData.RaceTable.Races.find(
            (race) => +race.round === roundNumber,
          ),
        ),
        map((race) => race),
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });
          throw `Error fetching schedule for round ${roundNumber}`;
        }),
      );
  }

  async getNextRace() {
    return this.httpService
      .get<{ MRData: SMRData }>(`/${new Date().getFullYear()}.json`)
      .pipe(
        map((response) =>
          response.data.MRData.RaceTable.Races.map((race) => {
            const date = race.date;

            const groups = date.match(/(\d{4})-(\d{2})-(\d{2})/);

            const [day, month, year] = groups;

            console.log({ day, month, year });

            return race;
          }),
        ),
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });
          throw "Error getting next race";
        }),
      );
  }
}
