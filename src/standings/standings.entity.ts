import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Constructor {
  @Field()
  constructorId: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  nationality: string;
}

@ObjectType()
export class ConstructorStandingEntity {
  @Field()
  position: string;

  @Field()
  points: string;

  @Field()
  wins: string;

  @Field()
  team: Constructor;
}

export type ConstructorStandingList = {
  season: string;
  round: string;
  ConstructorStandings: ConstructorStanding[];
};

type ConstructorStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
};

export type MRData = {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  StandingsTable: {
    season: string;
    round: string;
    StandingsLists: ConstructorStandingList[];
  };
};
