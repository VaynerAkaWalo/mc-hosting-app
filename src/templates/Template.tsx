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
    <div className="flex flex-row bg-stone-800 items-center h-1/4 w-full mc-border">
      <div className="h-4/6 w-1/4">
        <img className="h-full m-auto" src={wordUrl} alt="placeholder"/>
      </div>

      <div className="flex flex-col h-full py-8 w-1/2 text-zinc-300">
          <span className="font-bold text-xl">{name}</span>
          <span className="w-full h-1/2 my-auto">{description}</span>
      </div>

      <div className="flex flex-col justify-center h-2/3 w-1/4 px-4 text-zinc-300">
        <button className="bg-zinc-500 hover:bg-zinc-600 p-2" onClick={handleCreateServerFromTemplate}>Select template</button>
      </div>
    </div>
  )
}
