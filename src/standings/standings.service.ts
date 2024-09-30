import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import type { MRData as CMRData } from "./standings.entity";
import type { MRData as DMRData } from "./driver.entity";
import { catchError, map, tap } from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class StandingsService {
  constructor(private readonly httpService: HttpService) {}

  async getConstructorStandings() {
    return this.httpService
      .get<{ MRData: CMRData }>("/constructorStandings.json")
      .pipe(
        map((response) =>
          response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
            (stand) => ({
              points: stand.points,
              position: stand.points,
              wins: stand.wins,
              team: stand.Constructor,
            }),
          ),
        ),
        tap(() =>
          console.log({
            module: "standings-service:get-constructor-standings",
            message: "request processed successfully",
          }),
        ),
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });
          throw new Error(
            `error getting constructors standings ${error.message}`,
          );
        }),
      );
  }

  async getDriverStandings() {
    return this.httpService
      .get<{ MRData: DMRData }>("/driverStandings.json")
      .pipe(
        map((response) =>
          response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
            (stand) => ({
              points: stand.points,
              position: stand.position,
              driver: stand.Driver,
              team: stand.Constructors[0],
              wins: stand.wins,
            }),
          ),
        ),
        tap(() =>
          console.log({
            module: "standings-service:get-driver-standings",
            message: "request processed successfully",
          }),
        ),
        catchError((error: AxiosError) => {
          console.log({
            error: error.message,
            cause: error.cause,
            code: error.code,
          });
          throw new Error(
            `Error occured getting driver standings ${error.message}:${error.cause}:${error.code}`,
          );
        }),
      );
  }
}
