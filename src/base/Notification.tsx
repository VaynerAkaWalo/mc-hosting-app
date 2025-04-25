interface notificationProps {
  message: string
}

export function Notification({message}: notificationProps) {

  return (
    <div className="notification w-96 h-24 flex justify-center items-center text-zinc-200">
      <span>{message}</span>
    </div>)
}
