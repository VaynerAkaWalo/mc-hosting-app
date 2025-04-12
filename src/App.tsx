import './App.css'
import {Footer} from "./shared/Footer.tsx";
import {Outlet, useOutletContext} from "react-router-dom";
import {Notification} from "./shared/Notification.tsx";
import {useEffect, useState} from "react";

type NotificationContext =  { setNotificationMessage: React.Dispatch<React.SetStateAction<string>> }

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
        <Outlet context={{ setNotificationMessage } satisfies NotificationContext } />
        {showNotification && <Notification message={notificationMessage}/>}
      </div>
      <Footer/>
    </>
  )
}

export function UpdateNotification() {
  return useOutletContext<NotificationContext>()
}

export default App
