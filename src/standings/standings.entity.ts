import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class Team{
  @Field()
  id:string;
}


@ObjectType()
export class ConstructorStanding{
  @Field()
  id:string;

  @Field()
  position:number;

  @Field()
  points:number;

  @Field()
  team:Team
}


type Standings={
  id:string;
  position:number;
  points:number;
  constructor:{
    id:string;
  }}

export type ConstructorStandingsResponse={
  items:Standings[];
  currentPage:number;
  totalPage:number;
  totalCount:number;
  itemsNumber:10;
  hasPrevious:boolean;
  hasNext:boolean;
}
