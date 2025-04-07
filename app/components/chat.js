import { useEffect, useState } from "react"

import Link from "next/link"
import {db } from "@/firebaseConfig"
import { collection, getDocs, query, where, setDoc } from "firebase/firestore/lite"

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

    useEffect( () => {
        setMessages([]);
        const getConversations = async () => {
            const q = query(
                collection(db, 'conversations'),
                where("userId","==", activeUser.user.id)
            );

            const conversationSnap = await getDocs(q);
            const conversationData = conversationSnap.docs.map((doc) => doc.data());
            if (conversationData[0].messages) {
                setMessages(conversationData[0].messages)
                console.log(conversationData[0].messages[0].senderId)
            }            
        };

        getConversations();
    },[activeUser]);

    const submitMessage = (senderId) => {
        const newMessage = {
            text: inputValue,
            senderId: senderId ,
        };

        setMessages((prev) => [...prev, newMessage]);

        

        setInputValue("");
        // console.log(author)
    } 
    // console.log(activeUser)  
    // href={`/perfil?userName=${activeUser.user.name}`}
    return(
        <div className="display: flex flex-col justify-between bg-blue-900 m-1 p-1 border-2 border-blue-500 rounded-3xl ">
            <div className="flex justify-between m-2 items-center">
                <h2 
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }}
                    className="text-white text-2xl flex justify-center items-center font-bold underline ">Caja de chat-{""}{activeUser ? activeUser.user.name : "Elige un usuario para chatear"} 
                </h2>
                <div className="flex justify-around gap-3">
                    {/* <Link href={`/perfil?id=${activeUser?.user?.id}`} style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }} className="bg-blue-600 m-2 p-3 border-2 border-blue-300 rounded-2xl text-sm text-white cursor-pointer hover:bg-blue-900 active:translate-y-0.5" >VER PERFIL</Link>  */}

                    <Link href={`/perfil/${user}`} style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }} className="bg-blue-600 flex items-center h-10 mt-4 p-3 border-2 border-blue-300 rounded-2xl text-sm text-white cursor-pointer hover:bg-blue-900 active:translate-y-0.5"  >VER PERFIL </Link> 
                    <img className="h-30 w-30 rounded-3xl border-blue-400 border-4" src={activeUser.user.url}></img>
                </div>
            </div>
            <section className="border-blue-400 border-5 w-full h-full gap-2 rounded-2xl">
            {messages.map((message,index) =>(
                <div 
                    key={index}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"} my-1 `}
                >
                    <div className={` ${message.senderId === "me" ? "bg-blue-200": "bg-blue-400"} text-2xl rounded-2xl p-2 w-[50%] border-2 border-white`}>
                       {message.text}
                    </div>
                </div>
            ))}
            </section>
            <div className="flex w-full">
                <input 
                    type="text" 
                    value={inputValue}
                    className="bg-white w-full text-black rounded-tl-xl rounded-bl-xl p-1 m-1 " 
                    onChange={(event) => setInputValue(event.target.value)}
                ></input>
                <button
                    className="bg-blue-400 border border-black rounded px-4 py-2 hover:bg-blue-300"
                    onClick={() => submitMessage("me")}
                    >
                    Enviar  (como yo)
                </button>

                <button
                    className="bg-blue-500 border border-black rounded px-2 py-2 hover:bg-blue-600"
                    onClick={() => submitMessage(activeUser.user.id)}
                    >
                    Enviar (como {activeUser.user.name})
                </button>

            </div>
            
        </div>
        
        
    )
}