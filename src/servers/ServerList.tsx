import {Server} from "./Server.tsx";

export function ServerList() {

  return (
    <ul className="flex flex-col w-1/2 h-1/2 justify-evenly">
      <Server/>
      <Server/>
      <Server/>
    </ul>
  )
}
