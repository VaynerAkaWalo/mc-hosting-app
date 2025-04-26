import {useLocation, useNavigate} from "react-router-dom";
import Select, {SingleValue} from "react-select";
import {useEffect, useReducer, useState} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {sanitizeString} from "../utils/StringSanitizer.ts";
import {UpdateNotification} from "../App.tsx";
import {CreateServerRequest, ManagerClient, Opts} from "../clients/ManagerClient.ts";

enum CreatorTab {
  BASIC,
  ADVANCED,
  PLAYERS
}

interface Server {
  name: string
  opts: Opts
  expireTime: number
}

const initialServer: Server = {
  name: "",
  opts: {
    ONLINE_MODE: 'true',
    MAX_PLAYERS: "20",
    DIFFICULTY: "normal"
  },
  expireTime: 0
}

type ServerUpdateAction =
  | { type: 'UPDATE_NAME'; payload: string }
  | { type: 'UPDATE_EXPIRE_TIME'; payload: number }
  | { type: 'UPDATE_OPTS'; payload: Partial<Opts> }

function serverReducer(state: Server, action: ServerUpdateAction): Server {
  switch (action.type) {
    case "UPDATE_NAME":
      return {...state, name: action.payload}
    case "UPDATE_EXPIRE_TIME":
      return {...state, expireTime: action.payload}
    case "UPDATE_OPTS":
      return {...state, opts: {...state.opts, ...action.payload}}
  }
}

export function ServerCreator() {
  const [activeTab, setActiveTab] = useState<CreatorTab>(CreatorTab.BASIC)
  const [state, dispatch] = useReducer(serverReducer, initialServer)
  const { setNotificationMessage } = UpdateNotification()
  const { templateName, templateOps } = useLocation().state || {}
  const navigate = useNavigate()

  function isTemplated(): boolean {
    return templateName && templateOps
  }

  useEffect(() => {
    if (isTemplated()) {
      dispatch({ type: "UPDATE_OPTS", payload: templateOps})
    }
  }, []);

  const basicSettings = () => {
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

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawName = e.target.value

      dispatch({ type: "UPDATE_NAME", payload: sanitizeString(rawName)})
    }

    function getVersion(): string {
      if (isTemplated()) {
        return templateName + "-" + templateOps.VERSION
      }

      return state.opts.VERSION || ""
    }

    const updateVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isTemplated()) {
        setNotificationMessage("Version is locked for this template")
        return
      }
      const version = e.target.value
      dispatch({ type: "UPDATE_OPTS", payload: {VERSION: version}})
    }

    const updateReservationTime = (selectedReservationTime: SingleValue<{value: number}>) => {
      dispatch({ type: "UPDATE_EXPIRE_TIME", payload: selectedReservationTime?.value || 0})
    }

    return (
      <>
        <div className="flex flex-col w-1/2">
          <label htmlFor="server-name-input">Type your server name</label>
          <input className={"input-style"} id={"server-name-input"} type={"text"} placeholder={"Server name"} value={state.name} onChange={updateName}/>
        </div>

        <div className="flex flex-col w-1/2">
          <label htmlFor="server-version">Type version</label>
          <input className="input-style" id="server-version" type="text" placeholder="Leave blank for latest version" value={getVersion()} onChange={updateVersion}/>
        </div>

        <div className={"w-1/2"}>
          <label htmlFor={"server-reservation-time-select"}>Select reservation time</label>
          <Select id={"server-reservation-time-select"} className={"text-zinc-800"} options={reservationTimeOptions} onChange={updateReservationTime} value={reservationTimeOptions.find(option => option.value === state.expireTime)}/>
        </div>
      </>
    )
  }

  const advancedSettings = () => {
    const difficultOptions = [
      {
        label: "Peaceful",
        value: "peaceful"
      },
      {
        label: "Easy",
        value: "easy"
      },
      {
        label: "Normal",
        value: "normal"
      },
      {
        label: "Hard",
        value: "hard"
      },
    ]

    const updateMessageOfDay = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawMessage = e.target.value

      dispatch({ type: "UPDATE_OPTS", payload: {MOTD: sanitizeString(rawMessage)}})
    }

    const updateDifficulty = (selectedDifficulty: SingleValue<{value: string}>) => {
      dispatch({ type: "UPDATE_OPTS", payload: {DIFFICULTY: selectedDifficulty?.value}})
    }

    return (
      <>
        <div className="flex flex-col w-1/2">
          <label htmlFor="message-of-the-day">Type message of the day</label>
          <input className={"input-style"} id={"message-of-the-day"} type={"text"} placeholder={"Message of the day"} value={state.opts.MOTD} onChange={updateMessageOfDay}/>
        </div>

        <div className={"w-1/2"}>
          <label htmlFor={"server-difficulty"}>Select difficulty</label>
          <Select id={"server-difficulty"} className={"text-zinc-800"} options={difficultOptions} onChange={updateDifficulty} value={difficultOptions.find(option => option.value === state.opts.DIFFICULTY)}/>
        </div>
      </>
    )
  }

  const playerSettings = () => {
    const updateMaxPlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (!isNaN(Number(value))) {
        dispatch({type: "UPDATE_OPTS", payload: {MAX_PLAYERS: value}})
      }
    }

    const updateOperators = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      dispatch({type: "UPDATE_OPTS", payload: {OPS: value}})
    }

    const toggleOnlineMode = () => {
      const newValue = !(state.opts.ONLINE_MODE === 'true')
      dispatch({type: "UPDATE_OPTS", payload: {ONLINE_MODE: newValue.toString()}})
    }

    return (
      <>
        <div className="flex flex-col w-1/2">
          <label htmlFor="player-limit">Player limit</label>
          <input className="input-style text-right" id="player-limit" type="text" value={state.opts.MAX_PLAYERS} onChange={updateMaxPlayers}/>
        </div>

        <div className="flex flex-col w-1/2">
          <label htmlFor="operators">Server operators</label>
          <input className="input-style" id="operators" type="text" value={state.opts.OPS} onChange={updateOperators}/>
        </div>

        <div className={"flex flex-row items-center justify-evenly w-1/2"}>
          <FormControlLabel control={<Checkbox checked={state.opts.ONLINE_MODE === 'true'} onClick={toggleOnlineMode}/>} label="Online mode"/>
        </div>
      </>
    )
  }

  const createServer = async () => {
    if (state.name === "" || state.name.length < 3 || state.name.length > 25) {
      setNotificationMessage("Server name must have between 3 and 25 characters")
      return
    }

    if (state.expireTime === 0) {
      setNotificationMessage("Reservation time must be selected")
      return
    }

    const sanitizedOpts = Object.fromEntries(Object.entries(state.opts).filter(([_, v]) => v !== ""));

    const request: CreateServerRequest = {
      name: state.name,
      expireAfter: state.expireTime,
      opts: sanitizedOpts
    }

    await ManagerClient.createServer(request).catch(err => {
      setNotificationMessage("Failed to create server with unknown error " + err)
    }).then(() => {
      setNotificationMessage("Your server will be started shortly")
      navigate("/")
    })
  }

  return (
    <div className="modal h-2/5 w-1/3 flex flex-col text-zinc-300">
      <ul className="flex flex-row justify-evenly border-b-2 border-zinc-500">
        <button className="button" value={CreatorTab.BASIC} onClick={() => setActiveTab(CreatorTab.BASIC)}>Basic
        </button>
        <button className="button" value={CreatorTab.ADVANCED}
                onClick={() => setActiveTab(CreatorTab.ADVANCED)}>Advanced
        </button>
        <button className="button" value={CreatorTab.PLAYERS} onClick={() => setActiveTab(CreatorTab.PLAYERS)}>Players
        </button>
      </ul>
      <div className="flex flex-1 flex-col justify-evenly items-center">
        {activeTab === CreatorTab.BASIC && basicSettings()}
        {activeTab === CreatorTab.ADVANCED && advancedSettings()}
        {activeTab === CreatorTab.PLAYERS && playerSettings()}
      </div>
      <div className={"flex items-center justify-evenly w-full pb-6"}>
        <button className={"w-2/5 bg-zinc-500 hover:bg-zinc-600 py-2"} onClick={() => navigate("/")}>Cancel</button>
        <button className={"w-2/5 bg-zinc-500 hover:bg-zinc-600 py-2"} onClick={createServer}>Create server</button>
      </div>
    </div>
  )
}
