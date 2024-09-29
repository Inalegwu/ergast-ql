import { Module } from "@nestjs/common";
import { StandingsResolver } from "./standings.resolver";
import { StandingsService } from "./standings.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [],
      useFactory: async () => ({
        timeout: 10_000,
        baseURL: `https://ergast.com/api/f1/${new Date().getFullYear()}/`,
      }),
      inject: [],
    }),
  ],
  providers: [StandingsResolver, StandingsService],
})
export class StandingsModule {}
