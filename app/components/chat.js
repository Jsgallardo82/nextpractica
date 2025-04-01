import { useState } from "react"
import { MessageBox } from "./messageBox"
import Link from "next/link"

// Add a new document with a generated id.
// const docRef = await addDoc(collection(db, "cities"), {
//     name: "Tokyo",
//     country: "Japan"
//   });
//   console.log("Document written with ID: ", docRef.id);

export const Chat = ({activeUser}) => {
    const [inputValue,setInputValue] = useState('') ;
    const [messages, setMessages] = useState([]);
    const user = activeUser ? activeUser.user.id : null
    // console.log(activeUser)
    // console.log(activeUser.user)

    const submitMessage = (author) => {
        const newMessage = {
            text: inputValue,
            author: author ,
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        // console.log(author)
    } 
    // console.log(activeUser)  
    // href={`/perfil?userName=${activeUser.user.name}`}
    return(
        <div className="display: flex flex-col justify-between bg-amber-200 m-0">
            <div className="flex justify-between m-2">
                <h2 
                    className="text-3xl flex justify-center items-center font-bold underline">Caja de chat-{""}{activeUser ? activeUser.user.name : "Elige un usuario para chatear"} 
                </h2>
                <div className="flex justify-around gap-3">
                    <Link href={`/perfil?id=${activeUser?.user?.id}`} className="bg-amber-400 m-2 p-3 border-2 text-sm text-black cursor-pointer hover:bg-amber-800 active:translate-y-0.5" >VER PERFIL</Link> 

                    <Link href={`/perfil/${user}`} className="bg-amber-400 text-sm m-2 p-3 border-2 text-black cursor-pointer hover:bg-amber-800 active:translate-y-0.5" >VER PERFIL (OTRO)</Link> 
                    <img className="h-20 w-20 rounded-4xl" src={activeUser.user.url}></img>
                </div>
            </div>
            <section className="border-amber-600 border-5 w-full h-full gap-4">
            {messages.map((message,index) =>(
                <div 
                    key={index}
                    className={`flex ${message.author === "me" ? "justify-end" : "justify-start"} my-5`}
                >
                    <div className={`pl-2 ${message.author === "me" ? "bg-amber-300": "bg-amber-600"}  rounded-3xl  w-[50%]`}>
                       {message.text}
                    </div>
                </div>
            ))}
            </section>
            <div className="flex w-full">
                <input 
                    type="text" 
                    value={inputValue}
                    className="bg-white w-full text-black " 
                    onChange={(event) => setInputValue(event.target.value)}
                ></input>
                <button
                    className="bg-amber-100-300 p-8 rounded-md border-black-50"
                    onClick={() => submitMessage("me")}
                    >
                    Enviar (como yo)
                </button>
                <button
                    className="bg-blue-300 p-8 rounded-md border-black"
                    onClick={() => submitMessage(activeUser.user.name)}
                    >
                    Enviar (como {activeUser.user.name})
                </button>

            </div>
            
        </div>
        
        
    )
}