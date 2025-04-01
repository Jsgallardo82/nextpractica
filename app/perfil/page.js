"use client"

import  {Header}  from "../components/header";
import { useSearchParams } from "next/navigation";


const Profile = () => {
    const params = useSearchParams();
    const search = params.get("userName")
    // console.log(search);
    return (
        <section>
            <Header />
            <h2> Perfil de usuario: {search}</h2>
        </section>
    );
};

export default Profile;