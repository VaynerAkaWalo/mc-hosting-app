interface notificationProps {
  message: string
}

export function Notification({message}: notificationProps) {

  return (
    <div className="notification w-96 h-24 flex justify-center items-center">
      <span>{message}</span>
    </div>)
}
