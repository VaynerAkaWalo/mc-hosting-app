import {Link} from "react-router-dom";

interface ServerReqeust {
  name: string
  image: string
  expireAfter: number
}

interface ServerProps {
  id: number
  active: boolean
  name?: string
  ip?: string
  remainingTime?: string
}

export function Server({id, active, name, ip, remainingTime}: ServerProps) {

  const expire = () => {
    if (!remainingTime || remainingTime === "0s") {
      return "soon"
    }

    if (remainingTime.startsWith("-")) {
      return "expiring"
    }

    return remainingTime.replace("0s", "")
  }

  const activeServer = () => {
    return (
      <ul className="flex flex-col h-full justify-center items-center">
        <li>Name: {name}</li>
        <li>Expire: {expire()}</li>
        <li>Server IP: {ip}</li>
      </ul>
    )
  }

  return (
    <div className="border-zinc-500 bg-stone-800 text-zinc-300 border-t-2 border-l-2 border-b-4 border-r-4 w-full h-full my-3">
      {!active &&
        <div className="flex h-full justify-center items-center">
            <Link className="bg-zinc-500 hover:bg-zinc-600 hover:text-gray-200 py-2 px-2 text-center w-1/3" to={"/server-creator"}>Claim server</Link>
        </div>}
      {active && activeServer()}
    </div>
  )
}
