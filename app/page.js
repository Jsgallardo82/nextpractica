"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Chat } from "./components/chat"
import { ContactList } from "./components/contacList";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
import {db} from "@/firebaseConfig"
import {collection, getDocs,addDoc } from 'firebase/firestore/lite';

export default function Home() {
  const[activeUser, setActiveUser] = useState();
  // useStatus para los usuarios traidos de la API
  const[usersList,setUsersList] = useState([])
  // peticion para traer los usuarios de la API
  useEffect(()=>{
    // la funcion () se ejecuta cada vez que cambie el componente []
    const getUsers = async () =>{
      // trayendo informacion de una based e datos, firebase
      const usersCollection = collection(db, 'users')
      const usersSnapshot = await getDocs(usersCollection);
      const users = usersSnapshot.docs.map((user) => user.data())
      setUsersList(users)
      // console.log(users)
      // debe ser asincrona porque se realiza una petición
      // fetch es la funcion para hacer peticiones a las API
      // como fetch es una promesa, se debe colocar "await" para esperar que responda, cuando vuelve se guarda en responde
      // const responde = await fetch('https://randomuser.me/api/?results=5',{
      //   // peticion tipo GET, pero existen otras, POST;PUT;DELETE
      //     method: "GET",
      // });
      // // se transforma a objeto de javascript
      // const resp = await responde.json();
      //   // console.log(resp.results)
      //   // console.log(resp.results.cell)
      //   // usando la funcion que modifica el estado, en este caso setUsers, para modificar el estado de la lista de usuarios, dandole un nuevo valor
      //   setUsers(resp.results)
      } ;
  // se manda a llamar dentro del useEffect para usarla
  getUsers()
  }, [])
  // en este caso como el segundo parametro esta vacio, la funcion solo se ejecuta la primera vez, no cuando existan cambios
  // console.log(activeUser)
  return (
    <section>
      <Header />
      <div className="display: grid grid-cols-2 gap-1" style={{gridTemplateColumns: "1fr 4fr"}} >
        <ContactList usersList={usersList} setActiveUser={setActiveUser} activeUser={activeUser}/>
        <>
          {activeUser ?
        <Chat activeUser={activeUser}/>
        : <div className="bg-amber-200 text-3xl font-bold underline text-blue-800">Elige un usuario para chatear</div>}
        </>
      </div>
    </section>
  );
}
