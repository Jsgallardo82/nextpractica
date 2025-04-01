


export const ContactCard = ({user,setActiveUser,activeUser}) => {
    return(
        // al poner user entre corchetes, lo estoy ingresando como un objeto, en preferencia, escribirlo sin corchetes
        <div 
            className={`hover:bg-sky-700 cursor-pointer ${activeUser?.user?.name === user.name ? "bg-amber-500":"bg-amber-300"} flex`} 
            onClick={()=> setActiveUser({user})}
        >
            <div className="rounded-lg overflow-hidden m-2 p-4">
                <img className="h-30 w-30 rounded-4xl" src={user.url}></img>
            </div>
            <div className="flex flex-col justify-around">
                <h3>{user.name} {user.lastName}</h3>
                <p>{user.phone}</p>
                {/* <p>{user.id}</p> */}
            </div>
            
        </div>
    )
}