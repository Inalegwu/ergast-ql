import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { HttpModule, HttpService } from "@nestjs/axios";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { StandingsModule } from "./standings/standings.module";

@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal:true
    // }),
    ConfigModule.forRoot({
      isGlobal:true
    }),    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/schema.gql",
    }),
    StandingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
