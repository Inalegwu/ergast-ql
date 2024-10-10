import { Query, Resolver } from "@nestjs/graphql";
import { ConstructorStandingEntity } from "./standings.entity";
import { StandingsService } from "./standings.service";
import { DriverStandingEntity } from "./driver.entity";

@Resolver((of) => ConstructorStandingEntity)
export class StandingsResolver {
  constructor(private readonly standingService: StandingsService) {}

  @Query((returns) => [ConstructorStandingEntity], { name: "constructors" })
  async getConstructorStandings() {
    return this.standingService.getConstructorStandings();
  }

  @Query((returns) => [DriverStandingEntity], { name: "drivers" })
  async getDriverStandings() {
    return this.standingService.getDriverStandings();
  }
}
