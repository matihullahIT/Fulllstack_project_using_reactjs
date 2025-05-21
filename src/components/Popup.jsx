const Popup = ({props}) => {
  return (
    <div className={`absolute w-screen h-screen bg-gray-400 backdrop-blur-md`}>
        <div className="w-full h-full bg-white">
            {props}
        </div>

    </div>
  )
}

export default Popup
