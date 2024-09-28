import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError } from "rxjs";
import type{ConstructorStandingsResponse} from "./standings.entity";


@Injectable()
export class StandingsService{
  constructor(private readonly httpService:HttpService){}

  async getConstructorStandings(){
   const response=await this.httpService.axiosRef.get<ConstructorStandingsResponse>("/constructors-standings",{
     params:{
       isLastStanding:false
     }
   });


  const standings=response.data.items.map(item=>({
        id:item.id,
        position:item.position,
        points:item.points,
        team:item.constructor
      }))

      
      console.log(response);

      return standings          }  
  
}
