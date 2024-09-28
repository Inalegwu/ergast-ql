
import { Module } from '@nestjs/common';
import { ConstructorStandingsResolver } from './standings.resolver';
import { StandingsService } from './standings.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports:[    
HttpModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        timeout:10_000,
        baseURL:configService.get("BASE_URL"),
        headers:{
          "x-rapidapi-key":configService.get("RAPID_API_KEY"),
          "x-rapidapi-host":configService.get("RAPID_API_HOST")
        }
      }),
      inject:[ConfigService]
    }),  ],
  providers: [ConstructorStandingsResolver,StandingsService]
})
export class StandingsModule {}
