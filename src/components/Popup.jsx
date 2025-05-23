const Popup = ({props,button}) => {
  return (
    <div className={`absolute w-screen h-screen bg-gray-400 backdrop-blur-md`}>
        <div className="w-full h-full bg-white">
            {props}
        </div>
        <div>{button}</div>
    </div>
  )
}

export default Popup
