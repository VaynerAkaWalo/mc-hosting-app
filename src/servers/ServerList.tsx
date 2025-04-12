import {Server} from "./Server.tsx";
import * as React from "react";
import {useEffect} from "react";
import {ManagerClient} from "../clients/ManagerClient.ts";

interface ServerSlot {
  active: boolean,
  name?: string,
  ip?: string
  remainingTime?: string
}

export function ServerList() {
  const [servers, setServers] = React.useState<ServerSlot[]>([])

  const loadServers = async () => {
    const { data: servers } = await ManagerClient.listServers()

    setServers([])
    servers.forEach(server => {
      const activeServer: ServerSlot = {
        active: true,
        name: server.name,
        ip: server.IP,
        remainingTime: server.remainingTime
      }

      setServers(prev => ([...prev, activeServer]))
    })

    for (let i = servers.length; i < 3; i++) {
      const emptySlot: ServerSlot = {
        active: false
      }
      setServers(prev => ([...prev, emptySlot]))
    }
  }

  useEffect(() => {
    loadServers()
    const loader = setInterval(loadServers, 10000)
    return () => {
      clearInterval(loader)
    }
  }, [])

  return (
    <ul className="flex flex-col w-2/5 h-1/2 justify-evenly">
      {servers.map((server, index) => (
        <Server id={index} active={server.active} ip={server.ip} name={server.name} remainingTime={server.remainingTime}/>
      ))}
    </ul>
  )
}
