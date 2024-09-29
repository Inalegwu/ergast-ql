import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import type { MRData as CMRData } from "./standings.entity";
import type { MRData as DMRData } from "./driver.entity";

@Injectable()
export class StandingsService {
  constructor(private readonly httpService: HttpService) {}

  async getConstructorStandings() {
    const response = await this.httpService.axiosRef.get<{ MRData: CMRData }>(
      "/constructorStandings.json",
    );

    return response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (stand) => ({
        points: stand.points,
        position: stand.points,
        wins: stand.wins,
        team: stand.Constructor,
      }),
    );
  }

  async getDriverStandings() {
    const response = await this.httpService.axiosRef.get<{ MRData: DMRData }>(
      "/driverStandings.json",
    );

    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (stand) => ({
        points: stand.points,
        position: stand.position,
        driver: stand.Driver,
        team: stand.Constructors[0],
        wins: stand.wins,
      }),
    );
  }
}
