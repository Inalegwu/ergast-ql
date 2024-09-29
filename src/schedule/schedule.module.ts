import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleResolver } from "./schedule.resolver";
import { ScheduleService } from "./schedule.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        baseURL: "https://ergast.com/api/f1/",
        timeout: 10_000,
      }),
    }),
  ],
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
