import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { StandingsModule } from "./standings/standings.module";
import { ScheduleModule } from "./schedule/schedule.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/schema.gql",
    }),
    StandingsModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
