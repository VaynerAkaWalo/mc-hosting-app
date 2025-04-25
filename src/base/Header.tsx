import {Link} from "react-router-dom";

export function Header() {

  return (
    <ul className="flex flex-row header bg-stone-800 border-b-4 border-zinc-500 justify-around items-center w-full h-12">
      <li><Link to={"/"}>Servers</Link></li>
      <li><Link to={"/server-templates"}>Templates</Link></li>
    </ul>
  )
}
