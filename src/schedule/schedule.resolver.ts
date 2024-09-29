import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Schedule } from "./schedule.entity";
import { ScheduleService } from "./schedule.service";

@Resolver((of) => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query((returns) => [Schedule], { name: "schedule" })
  getSchedule() {
    return this.scheduleService.getSchedule();
  }

  @Query(returns=>Schedule,{name:"roundSchedule"})
  async getScheduleByRound(@Args("round",{type:()=>Int}) roundNumber:number){
    return this.scheduleService.getScheduleForRound(roundNumber);
  }

  @Query((returns) => [Schedule], { name: "nextRace" })
  async getCloseSchedule() {
    return this.scheduleService.getNextRace();
  }
}
