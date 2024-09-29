import { ObjectType, Field } from "@nestjs/graphql";
import { Constructor } from "./standings.entity";

@ObjectType()
export class Driver {
  @Field()
  driverId: string;

  @Field()
  permanentNumber: string;

  @Field()
  code: string;

  @Field()
  url: string;

  @Field()
  givenName: string;

  @Field()
  familyName: string;

  @Field()
  dateOfBirth: string;

  @Field()
  nationality: string;
}

@ObjectType()
export class DriverStandingEntity {
  @Field()
  position: string;

  @Field()
  points: string;

  @Field()
  wins: string;

  @Field()
  driver: Driver;

  @Field()
  team: Constructor;
}

export type MRData = {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: {
    season: string;
    round: string;
    StandingsLists: StandingList[];
  };
};

export type StandingList = {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
};

type DriverStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructors: Constructor[];
};
