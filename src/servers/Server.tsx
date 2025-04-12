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
  const provisionServer = () => {
    const request: ServerReqeust = {
      name: "server-" + id,
      image: "ghcr.io/thijmengthn/papermc:latest",
      expireAfter: 300000
    }

    fetch("https://blamedevs.com/mc-server-manager/servers", {
      method: "POST",
      body: JSON.stringify(request)
    })
  }

  const inactive = () => {
    return (
      <div className="flex h-full justify-center items-center">
        <button type="button" className="bg-zinc-300 hover:bg-zinc-500 hover:text-gray-200 border-t-2 border-l-2 border-b-4 border-r-4 border-zinc-500 h-1/4 px-2" onClick={provisionServer}>Claim server slot</button>
      </div>
    )
  }

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
    <div className="border-zinc-500 bg-zinc-400 border-t-4 border-l-4 border-b-8 border-r-8 w-full h-full my-3">
      {!active && inactive()}
      {active && activeServer()}
    </div>
  )
}
