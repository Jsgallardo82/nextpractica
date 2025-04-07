import { useState, useEffect, use } from "react";
import { db } from "@/firebaseConfig";
import { storage } from "@/firebaseConfig";
import { doc,setDoc , getDoc} from "firebase/firestore/lite"

import { getStorage, ref , getDownloadURL} from "firebase/storage";

export const ContactCard = ({user,setActiveUser,activeUser}) => {
    const[urlStorage, setUrlStorage ] = useState('')

    useEffect(() => {
        const getImageStorage = async () => {
            // elegimos la imagen, por el nombre, del storage
            const imageRef =  ref(storage, user.url);
            // console.log("image",user.name,imageRef.fullPath);
            // de esta forma a la imagen referenciada le creamos una url o traemos la url de la storage
            const imageUrl = await getDownloadURL(imageRef)
    
            console.log("image",imageUrl);
            // // ubicamos la imagen a la setImage, para que sea el estado de image 
            setUrlStorage(imageUrl)
            // console.log(urlStorage)
            
    
        };
        if (user) {
            getImageStorage();
            
        } 
        
    },[user])
    


    return(
        // al poner user entre corchetes, lo estoy ingresando como un objeto, en preferencia, escribirlo sin corchetes
        <div 
            className={`hover:bg-sky-700 cursor-pointer ${activeUser?.user?.name === user.name ? "bg-blue-700":"bg-blue-400"} flex rounded-3xl border-2 shadow-2xl m-1`} 
            onClick={()=> setActiveUser({user})}
        >
            <div className="rounded-lg overflow-hidden m-1 p-3">
                <img className="h-30 w-30 rounded-4xl border-2 " 
                    src={ urlStorage || user.url}></img>
            </div>
            <div className="flex flex-col justify-center">
                <h3
                    className="text-white"
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 1)'
                    }}
                    >
                    {user.name} {user.lastName}
                </h3>
                <p className="text-white text-2xl"
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 1)'
                    }}
                    >{user.phone}</p>
                {/* <p>{user.id}</p> */}
            </div>
            
        </div>
    )
}