import './App.css'
import {Footer} from "./shared/Footer.tsx";
import {ServerList} from "./servers/ServerList.tsx";

function App() {

  return (
    <>
      <div className="h-screen flex justify-center items-center text-gray-700">
        <ServerList/>
      </div>
      <Footer/>
    </>
  )
}

export default App
