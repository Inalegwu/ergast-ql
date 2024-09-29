import { Query, Resolver } from "@nestjs/graphql";
import { Schedule } from "./schedule.entity";
import { ScheduleService } from "./schedule.service";

@Resolver((of) => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query((returns) => [Schedule])
  getSchedule() {
    return this.scheduleService.getSchedule();
  }
}
