import Select, {PropsValue} from "react-select";
import {ChangeEventHandler, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CreateServerRequest, ManagerClient} from "../clients/ManagerClient.ts";
import {UpdateNotification} from "../App.tsx";

export function ServerCreator() {
  const [serverName, setServerName] = useState<string>("")
  const [version, setVersion] = useState<PropsValue<any>>("")
  const [reservationTime, setReservationTime] = useState<PropsValue<any>>("")
  const navigate = useNavigate();
  const { setNotificationMessage } = UpdateNotification()

  const versions = [
    {
      label: "vanilla",
      options: [
        {
          label: "1.24.3",
          value: "1.24.3-vanilla"
        },
        {
          label: "1.24.2",
          value: "1.24.2-vanilla"
        },
        {
          label: "1.24.1",
          value: "1.24.1-vanilla"
        }
      ]
    },
    {
      label: "lookout",
      options: [
        {
          label: "1.24.1",
          value: "1.24.1-lookout"
        }
      ]
    }
  ]

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

  const handleVersionChange = (selectedVersion: ChangeEventHandler) => {
    setVersion(selectedVersion)
  }

  const handleReservationTimeChange = (selectedTime: ChangeEventHandler) => {
    setReservationTime(selectedTime)
  }

  const handleCreateServer = async () => {
    if (serverName === "") {
      setNotificationMessage("You need to specify server name")
      return
    }

    if (version === "") {
      setNotificationMessage("You need to specify server version")
      return
    }

    if (reservationTime === "") {
      setNotificationMessage("You need to specify reservation time")
      return
    }

    const request: CreateServerRequest = {
      name: serverName.replace(/ /g, '-'),
      version: version.value,
      expireAfter: reservationTime.value
    }
    console.log(request)

    await ManagerClient.createServer(request)
    setNotificationMessage("Your server will be started shortly")
    navigate("/")
  }

  return (
    <div className="modal h-1/3 w-1/3 py-4 flex flex-col text-zinc-300 items-center justify-around">
      <div className={"flex flex-col w-1/2"}>
        <label htmlFor={"server-name-input"}>Type your server name</label>
        <input className={"input-style"} id={"server-name-input"} type={"text"} placeholder={"Server name"} value={serverName} onChange={updateServerName}/>
      </div>

      <div className={"w-1/2"}>
        <label htmlFor={"server-version-select"}>Select version</label>
        <Select id={"server-version-select"} className={"text-zinc-800"} options={versions} value={version} onChange={handleVersionChange}/>
      </div>

      <div className={"w-1/2"}>
        <label htmlFor={"server-reservation-time-select"}>Select reservation time</label>
        <Select id={"server-reservation-time-select"} className={"text-zinc-800"} options={reservationTimeOptions} value={reservationTime} onChange={handleReservationTimeChange}/>
      </div>

      <div className={"w-4/5 flex justify-evenly"}>
        <button className={"w-2/5 bg-zinc-500 hover:bg-zinc-600 py-2"} onClick={() => navigate("/")}>Cancel</button>
        <button className={"w-2/5 bg-zinc-500 hover:bg-zinc-600 py-2"} onClick={handleCreateServer}>Create server</button>
      </div>
    </div >
  )
}
