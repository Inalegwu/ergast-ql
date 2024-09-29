import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleResolver } from "./schedule.resolver";
import { ScheduleService } from "./schedule.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [],
      useFactory: async () => ({
        timeout: 10_000,
        baseURL: "https://ergast.com/api/f1/",
      }),
      inject: [],
    }),
  ],
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
