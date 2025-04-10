import * as React from "react";

export function Server() {
  const [isActive, setIsActive] = React.useState(false)


  const provisionServer = () => {
    setIsActive(true)
  }

  const inactive = () => {
    return (
      <div className="flex h-full justify-center items-center">
        <button type="button" className="bg-zinc-300 hover:bg-zinc-500 hover:text-gray-200 border-t-2 border-l-2 border-b-4 border-r-4 border-zinc-500 h-1/4 px-2" onClick={provisionServer}>Provision new server</button>
      </div>
    )
  }

  const active = () => {
    return (
      <ul className="flex flex-col h-full justify-center items-center">
        <li>Server IP: 192.168.1.1</li>
        <li>Version: 1.21.3</li>
        <li>Active players: 0/10</li>
        <li>Remaining time: 10m</li>
      </ul>
    )
  }

  return (
    <div className="border-zinc-500 bg-zinc-400 border-t-4 border-l-4 border-b-8 border-r-8 w-full h-full my-3">
      {!isActive && inactive()}
      {isActive && active()}
    </div>
  )
}
