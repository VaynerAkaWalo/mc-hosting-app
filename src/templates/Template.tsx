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
    <div className="flex flex-row bg-stone-800 items-center h-52 w-full mc-border py-8 px-8">
      <div className="flex h-full flex-1 items-center justify-center">
        <img className="max-h-full" src={wordUrl} alt="placeholder"/>
      </div>

      <div className="flex flex-col h-full w-96 text-zinc-300 px-8">
          <span className="font-bold text-xl mb-4">{name}</span>
          <span>{description}</span>
      </div>

      <div className="flex flex-1 justify-center text-zinc-300">
        <button className="bg-zinc-500 hover:bg-zinc-600 px-8 py-2" onClick={handleCreateServerFromTemplate}>Select</button>
      </div>
    </div>
  )
}
