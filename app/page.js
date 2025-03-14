"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Chat } from "./components/chat"
import { ContactList } from "./components/contacList";
import { Header } from "./components/header";
import { useState } from "react";

export default function Home() {
  const[activeUser, setActiveUser] = useState("");

  return (
    <section>
      <Header />
      <div className="display: flex justify-around" >
        <ContactList setActiveUser={setActiveUser}/>  
        <Chat activeUser={activeUser}/>
      </div>
    </section>
  );
}
