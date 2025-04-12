import './App.css'
import {Footer} from "./shared/Footer.tsx";
import {Outlet} from "react-router-dom";
import {Notification} from "./shared/Notification.tsx";
import {useEffect, useState} from "react";

function App() {
  const [notificationMessage, setNotificationMessage] = useState<string>("")
  const [showNotification, setShowNotification] = useState<boolean>(false)

  useEffect(() => {
    if (notificationMessage === "") {
      return
    }
    const current = notificationMessage;
    setShowNotification(true)
    setTimeout(() => {
      if (notificationMessage == current) {
        setShowNotification(false)
        setNotificationMessage("")
      }
    }, 3500)
  }, [notificationMessage])

  return (
    <>
      <div className="h-screen flex justify-center items-center text-gray-700">
        <Outlet context={[setNotificationMessage]}/>
        {showNotification && <Notification message={notificationMessage}/>}
      </div>
      <Footer/>
    </>
  )
}

export default App
