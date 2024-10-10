import { HttpService } from "@nestjs/axios";
import type { MRData as SMRData } from "./schedule.entity";
import { catchError, map, retry, tap } from "rxjs";
import { AxiosError } from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
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

          throw new Error(`Error getting schedule ${error.message}`);
        }),
        retry({
          count: 3,
          resetOnSuccess: true,
          delay: 3000,
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
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });
          throw new Error(`Error getting schedule for round ${error.message}`);
        }),
        retry({
          count: 3,
          resetOnSuccess: true,
          delay: 3000,
        }),
      );
  }

  // TODO: figure out a way to detect the next race
  // from the current day
  async getNextRace(previousRound: number) {
    const date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;

    return this.httpService
      .get<{ MRData: SMRData }>(`/${new Date().getFullYear()}.json`)
      .pipe(
        map((response) =>
          response.data.MRData.RaceTable.Races.filter(
            (race) => +race.round === previousRound + 1,
          ).at(0),
        ),
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });
          throw new Error(`Error getting next race ${error.message}`);
        }),
        retry({
          count: 3,
          resetOnSuccess: true,
          delay: 3000,
        }),
      );
  }
}
