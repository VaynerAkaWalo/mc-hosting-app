import wordUrl from '../assets/world.png'
import {useNavigate} from "react-router-dom";

export interface template {
  name: string
  description: string
  opts: object
}

export function Template({name, description, opts}: template) {
  const navigate = useNavigate()

  const handleCreateServerFromTemplate = () => {
    navigate("/server-templates/creator", { state: { name, opts } } )
  }

  return (
    <div className="flex flex-row bg-stone-800 items-center h-1/2 w-full mc-border">
      <div className="h-2/3 w-1/3 pl-8">
        <img className="h-full" src={wordUrl} alt="placeholder"/>
      </div>
      <div className="flex flex-col items-center h-full py-8 px-4 w-2/3 text-zinc-300">
          <span className="font-bold">{name}</span>
          <span className="w-full h-1/2 my-auto">{description}</span>
          <button className="bg-zinc-500 hover:bg-zinc-600 p-2" onClick={handleCreateServerFromTemplate}>Create server from template</button>
      </div>
    </div>
  )
}
