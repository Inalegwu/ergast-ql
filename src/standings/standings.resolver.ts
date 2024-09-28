import { Query, Resolver } from "@nestjs/graphql";
import { ConstructorStanding } from "./standings.entity";
import { StandingsService } from "./standings.service";

@Resolver(of=>ConstructorStanding)
export class ConstructorStandingsResolver{
  constructor(private readonly standingService:StandingsService){}


  @Query(returns=>ConstructorStanding,{name:"constructors"})
  async getConstructorStandings(){
    return this.standingService.getConstructorStandings()
  }

  async getDriverStandings(){
    return []
  }
  
}
