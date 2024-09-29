import { HttpService } from "@nestjs/axios";
import type { MRData as SMRData } from "./schedule.entity";

export class ScheduleService {
  constructor(private readonly httpService: HttpService) {}

  async getSchedule() {
    const year = new Date().getFullYear();
    console.log({ year });
    const response = await this.httpService.axiosRef.get<{ MRData: SMRData }>(
      `${new Date().getFullYear()}.json`,
    );

    return response.data.MRData.RaceTable.Races;
  }
}
