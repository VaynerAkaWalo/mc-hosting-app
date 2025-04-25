import {ChangeEventHandler, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@mui/material";
import Select, {PropsValue} from "react-select";
import {CreateServerRequest, ManagerClient} from "../clients/ManagerClient.ts";
import {UpdateNotification} from "../App.tsx";

export function TemplateServerCreator() {
  const [serverName, setServerName] = useState<string>("")
  const [onlineMode, setOnlineMode] = useState<boolean>(true)
  const [reservationTime, setReservationTime] = useState<PropsValue<any>>("")
  const { setNotificationMessage } = UpdateNotification()

  const location = useLocation()
  const { name, opts } = location.state || {}
  const navigate = useNavigate()

  const reservationTimeOptions = [
    {
      value: 300000,
      label: "5min"
    },
    {
      value: 900000,
      label: "15min"
    },
    {
      value: 3600000,
      label: "1h"
    },
    {
      value: 10800000,
      label: "3h"
    }
  ]

  const updateServerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerName(e.currentTarget.value)
  }

  const handleReservationTimeChange = (selectedTime: ChangeEventHandler) => {
    setReservationTime(selectedTime)
  }

  const toggleOnlineMode = () => {
    setOnlineMode(prev => !prev)
  }

  const handleCreateServer = async () => {
    if (serverName === "") {
      setNotificationMessage("You need to specify server name")
      return
    }

    if (reservationTime === "") {
      setNotificationMessage("You need to specify reservation time")
      return
    }

    const request: CreateServerRequest = {
      name: serverName.replace(/ /g, '-'),
      opts: {...opts, ONLINE_MODE: onlineMode.toString()},
      expireAfter: reservationTime.value
    }

    console.log(JSON.stringify(request))

    await ManagerClient.createServer(request)
    setNotificationMessage("Your server will be started shortly")
    navigate("/")
  }

  return (
    <div className="modal h-2/5 w-2/5 py-4 flex flex-col text-zinc-300 items-center justify-around">
      <div className="flex flex-col w-1/2 text-center">
        <span>Selected template: {name}</span>
      </div>

      <div className={"flex flex-col w-1/2"}>
        <label htmlFor={"server-name-input"}>Type your server name</label>
        <input className={"input-style"} id={"server-name-input"} type={"text"} placeholder={"Server name"} value={serverName} onChange={updateServerName}/>
      </div>

      <div className={"w-1/2"}>
        <label htmlFor={"server-reservation-time-select"}>Select reservation time</label>
        <Select id={"server-reservation-time-select"} className={"text-zinc-800"} options={reservationTimeOptions} value={reservationTime} onChange={handleReservationTimeChange}/>
      </div>

      <div className={"flex flex-row items-center justify-evenly w-1/2"}>
        <FormControlLabel control={<Checkbox checked={onlineMode} onChange={toggleOnlineMode}/>} label="Online mode"/>
      </div>

      <div className={"w-4/5 flex justify-evenly"}>
        <button className={"w-2/5 bg-zinc-500 hover:bg-zinc-600 py-2"} onClick={() => navigate("/")}>Cancel</button>
        <button className={"w-2/5 bg-zinc-500 hover:bg-zinc-600 py-2"} onClick={handleCreateServer}>Create server</button>
      </div>
    </div>
  )
}
