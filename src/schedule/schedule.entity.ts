import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class Location {
  @Field()
  lat: string;

  @Field()
  long: string;

  @Field()
  locality: string;

  @Field()
  country: string;
}

@ObjectType()
export class Day {
  @Field()
  date: string;

  @Field()
  time: string;
}

@ObjectType()
export class Circuit {
  @Field()
  circuitId: string;

  @Field()
  url: string;

  @Field()
  circuitName: string;

  @Field()
  Location: Location;
}

@ObjectType()
export class Schedule {
  @Field()
  season: string;

  @Field()
  round: string;

  @Field()
  url: string;

  @Field()
  raceName: string;

  @Field()
  Circuit: Circuit;

  @Field()
  date: string;

  @Field()
  time: string;

  @Field({ nullable: true })
  FirstPractice: Day;

  @Field({ nullable: true })
  SecondPractice: Day;

  @Field({ nullable: true })
  ThirdPractice: Day;

  @Field({ nullable: true })
  Qualifying: Day;

  @Field({ nullable: true })
  Sprint: Day;
}

export type Race = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  FirstPractice: {
    date: string;
    time: string;
  };
  SecondPractice: {
    date: string;
    time: string;
  };
  ThirdPractice: {
    date: string;
    time: string;
  };
  Qualifying: {
    date: string;
    time: string;
  };
  Sprint?: {
    date: string;
    time: string;
  };
};

type RaceTable = {
  season: string;
  Races: Race[];
};

export type MRData = {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
};
