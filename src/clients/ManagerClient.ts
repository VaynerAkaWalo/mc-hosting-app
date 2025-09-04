import {HTTPClient} from "./Client.ts";
import {AxiosPromise} from "axios";

export interface CreateServerRequest {
  name: string,
  opts: Opts,
  duration: number,
  tier: Tier
}

export interface Opts {
  ONLINE_MODE?: string
  DIFFICULTY?: string
  MAX_PLAYERS?: string
  VERSION?: string
  TYPE?: string
  MODS?: string
  MOTD?: string
  OPS?: string
  MODRINTH_PROJECTS?: string
}

export enum Tier {
  wooden = "wooden",
  iron = "iron",
  diamond = "diamond"
}

export interface ServerResponse {
  name: string,
  IP: string,
  remainingTime: string,
  status: string
}

class ServerManager {
  private readonly baseUrl: string;


  constructor() {
    this.baseUrl = "https://blamedevs.com/mc-server-manager";
  }

  public createServer = (request: CreateServerRequest): Promise<AxiosPromise<ServerResponse>> => {
    return HTTPClient.post(this.baseUrl + "/servers", request)
  }

  public listServers = async (): Promise<AxiosPromise<ServerResponse[]>> => {
    return HTTPClient.get(this.baseUrl + "/servers")
  }
}

export const ManagerClient = new ServerManager()
