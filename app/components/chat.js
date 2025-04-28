import { useEffect, useState } from "react"
import { GoogleGenAI } from "@google/genai";
import Link from "next/link"
import {db } from "@/firebaseConfig"
import { doc, collection, getDoc, query, where, setDoc, updateDoc, arrayUnion } from "firebase/firestore/lite"


const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_APIKEY,
});

export const Chat = ({activeUser}) => {
    const [inputValue,setInputValue] = useState('') ;
    const [messages, setMessages] = useState([]);
    const user = activeUser ? activeUser.user.id : null
    // console.log(activeUser)
    // console.log(activeUser.user)

    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
        config: {
            systemInstruction: "You are a cat. Your name is Neko.",
          },
    });

    const submitMessage = async (senderId) => {
        const caramelId = "CtB8aUHhqiBdWzzVtCZz"; // ID de Caramel
        const userId = activeUser?.user?.id; // ID del usuario activo
        const conversationRef = doc(db, "conversations", userId); // Referencia al documento de la conversación
    
        const newMessage = {
            text: inputValue,
            senderId: senderId,
            date: new Date().toISOString(),
            read: senderId === "me", // Si lo envías tú, se marca como leído
        };
    
        try {
            // Verificar si la conversación ya existe
            const conversationSnap = await getDoc(conversationRef);
    
            if (conversationSnap.exists()) {
                // Si existe, actualiza el array de mensajes y el último mensaje
                await updateDoc(conversationRef, {
                    messages: arrayUnion(newMessage),
                    lastMessage: inputValue,
                });
            } else {
                // Si no existe, crea un nuevo documento con el mensaje inicial
                await setDoc(conversationRef, {
                    userId: userId,
                    messages: [newMessage],
                    lastMessage: inputValue,
                });
            }
    
            // Actualizar el estado local de mensajes
            setMessages((prev) => [...prev, newMessage]);
            setInputValue(""); // Limpiar el campo de entrada
        } catch (error) {
            console.error("Error al guardar el mensaje:", error);
        }
    
        // Si el mensaje es para la IA, también envía el mensaje a la IA
        if (userId === caramelId && senderId === "me") {
            await askGemini(inputValue);
        }
    };

    // useEffect( () => {
    //     setMessages([]);
    //     const getConversations = async () => {
    //         const q = query(
    //             collection(db, 'conversations'),
    //             where("userId","==", activeUser.user.id)
    //         );

    //         const conversationSnap = await getDocs(q);
    //         const conversationData = conversationSnap.docs.map((doc) => doc.data());
    //         if (conversationData[0].messages) {
    //             setMessages(conversationData[0].messages)
    //             console.log(conversationData[0].messages[0].senderId)
    //         }            
    //     };

    //     getConversations();
    // },[activeUser]);

    // const submitMessage = async (senderId) => {
    //     const caramelId = "CtB8aUHhqiBdWzzVtCZz"; // ID de Caramel
    //     const userId = activeUser?.user?.id; // ID del usuario activo
    //     const conversationRef = doc(db, "conversations", userId); // Referencia al documento de la conversación
    //     // console.log("la referencia a la conersacion",conversationRef)
    //     // Verificar si el mensaje es para la IA (Caramel)
    //     // console.log("senderId", senderId)
    //     if (activeUser?.user?.id === caramelId) {
    //         if (senderId !== "me") {
    //             alert("Solo puedes hablar con la IA cuando estás en el chat de Caramel.");
    //             return;
    //         }
    //     const newMessage = {
    //         text: inputValue,
    //         senderId: senderId,
    //         date: new Date().toISOString(),
    //         read: senderId === "me", // Si lo envías tú, se marca como leído
    //     };
    //     // console.log("el nuevo mensaje", newMessage)
    //     try {
    //         // Verificar si la conversación ya existe
    //         const conversationSnap = await getDoc(conversationRef);
    //         console.log(" el snap de la conversacion", conversationSnap)
    
    //         if (conversationSnap.exists()) {
    //             // Si existe, actualiza el array de mensajes y el último mensaje
    //             await updateDoc(conversationRef, {
    //                 messages: arrayUnion(newMessage),
    //                 lastMessage: inputValue,
    //             });
    //         } else {
    //             // Si no existe, crea un nuevo documento con el mensaje inicial
    //             await setDoc(conversationRef, {
    //                 userId: userId,
    //                 messages: [newMessage],
    //                 lastMessage: inputValue,
    //             });
    //         }
    
    //         // Actualizar el estado local de mensajes
    //         // setMessages((prev) => [...prev, newMessage]);
    //         // setInputValue(""); // Limpiar el campo de entrada
    //     } catch (error) {
    //         console.error("Error al guardar el mensaje:", error);
    //     }
    //         // Agregar el mensaje del usuario al estado antes de enviar a la IA
    //     // const newMessage = {
    //     //     text: inputValue,
    //     //     senderId: senderId,
    //     // };
    //     setMessages((prev) => [...prev, newMessage]);

    //         // Enviar mensaje a la IA
    //         await askGemini(inputValue);
    //     } else {
    //         // Enviar mensaje a otro usuario
    //         const newMessage = {
    //             text: inputValue,
    //             senderId: senderId,
    //         };
    
    //         setMessages((prev) => [...prev, newMessage]);
    //     }
    
    //     setInputValue("");
    // };

    // const askGemini = async (inputValue) => {

    //     if (activeUser?.user?.id !== "CtB8aUHhqiBdWzzVtCZz") {
    //         alert("Solo puedes hablar con la IA cuando estás en el chat de Caramel.");
    //         return;
    //     }

    //     const response = await chat.sendMessage({
    //         message: inputValue,
    //     })

    //     // console.log("responde", response.text);

    //     const newMessage ={
    //         text: response.text,
    //         senderId: activeUser.user.id
    //     };

    //     setMessages((prev) => [...prev, newMessage]);
    // }
    const askGemini = async (inputValue) => {
        const caramelId = "CtB8aUHhqiBdWzzVtCZz"; // ID de Caramel
        const userId = activeUser?.user?.id; // ID del usuario activo
        const conversationRef = doc(db, "conversations", userId); // Referencia al documento de la conversación
    
        if (activeUser?.user?.id !== caramelId) {
            alert("Solo puedes hablar con la IA cuando estás en el chat de Caramel.");
            return;
        }
    
        const response = await chat.sendMessage({
            message: inputValue,
        });
    
        console.log("responde", response.text);
    
        const newMessage = {
            text: response.text,
            senderId: caramelId, // El ID de la IA
            date: new Date().toISOString(),
            read: true, // Se marca como leído automáticamente
        };
    
        try {
            // Actualizar Firestore con el mensaje de la IA
            const conversationSnap = await getDoc(conversationRef);
    
            if (conversationSnap.exists()) {
                // Si la conversación existe, actualiza el array de mensajes y el último mensaje
                await updateDoc(conversationRef, {
                    messages: arrayUnion(newMessage),
                    lastMessage: response.text,
                });
            } else {
                // Si no existe, crea un nuevo documento con el mensaje inicial
                await setDoc(conversationRef, {
                    userId: userId,
                    messages: [newMessage],
                    lastMessage: response.text,
                });
            }
    
            // Actualizar el estado local de mensajes
            setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
            console.error("Error al guardar el mensaje de la IA:", error);
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            if (!activeUser) return; // Si no hay usuario activo, no hacer nada

            const userId = activeUser.user.id; // ID del usuario activo
            const conversationRef = doc(db, "conversations", userId); // Referencia al documento de la conversación

            try {
                const conversationSnap = await getDoc(conversationRef);

                if (conversationSnap.exists()) {
                    // Si la conversación existe, cargar los mensajes
                    const conversationData = conversationSnap.data();
                    setMessages(conversationData.messages || []); // Cargar los mensajes en el estado
                } else {
                    // Si no existe, limpiar los mensajes
                    setMessages([]);
                }
            } catch (error) {
                console.error("Error al cargar los mensajes:", error);
            }
        };

        loadMessages();
    }, [activeUser]); // Ejecutar cada vez que cambie el usuario activo

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
            <section className="border-blue-400 border-5 w-full h-[65vh] gap-2 rounded-2xl overflow-y-scroll scrollbar-none">
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