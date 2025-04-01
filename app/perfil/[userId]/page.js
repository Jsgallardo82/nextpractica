"use client"

import  {Header}  from "../../components/header";
import { useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { db } from "@/firebaseConfig";
import { doc,setDoc , getDoc} from "firebase/firestore/lite"
import { AiOutlineSetting } from "react-icons/ai";
import { Loading } from "@/app/components/loading";



const profileDynamic = () => {
    const [user, setUser] = useState();
    // estados para modificar la informacion de la database 
    const [modificarName, setModificarName] = useState('');
    const [modificarLastName, setModificarLastName] = useState('');
    const [modificarUrl, setModificarUrl] = useState('');
    const [modificarPhone, setModificarPhone] = useState('');


    const params = useParams();
    // console.log(params.userId)
    // console.log(user)
    // const search = params.userId;

    useEffect(() => {
        const getUser = async () => {
            const userRef = doc(db, 'users', params.userId);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            // console.log(userData);  
            setUser(userData);
        };
        getUser();
    },[])


    const submitInfo = async () => {
        const modificarUser = {
            name: modificarName,
            lastName: modificarLastName,
            url: modificarUrl,
            phone: modificarPhone,

        };
        
        await ModificarDataUser();

        setModificarName("");
        setModificarLastName("");
        setModificarUrl("");
        setModificarPhone("");
    } 

    async function ModificarDataUser() { 
        const userRef = doc(db,'users', params.userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        await setDoc(userRef,{
            name: modificarName || userData.Name,
            lastName: modificarLastName || userData.lastName,
            url: modificarUrl || userData.url,
            phone: modificarPhone|| userData.phone,
        }, { merge: true }); // `merge: true` para no sobrescribir toda la informacion
        // console.log("el nuevo nombre de usuario es ", user);     
    }



    useEffect(() => {
        // Importar Bootstrap JS solo en el lado del cliente
        import("bootstrap/dist/js/bootstrap.bundle.min");
      }, []);

    return (
        <section>
            <Header />
            { user ? (
                <div className="flex flex-col bg-amber-300 gap-3">
                    <div className="flex justify-around">
                        <div className="flex flex-col m-0 p-2  w-1/2">
                            <div className="flex gap-3 text-4xl">
                                <h2> Perfil de usuario de otra forma:</h2>  
                                <strong className="text-decoration-underline ">{user.name}</strong>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <p className="text-black-100 text-4xl"><AiOutlineSetting /></p>
                                </button> 
                            </div>
                                            {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " role="document">
                    <div className="modal-content">
                    <div className="modal-header ">
                        <h2 className="modal-title" id="exampleModalLabel">Modificar información de contacto</h2>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body flex flex-col">
                        <input className="rounded-2xl p-2" value={modificarName} onChange={(e) => setModificarName(e.target.value)} placeholder="nombre" ></input>
                        <input   className="rounded-3xl p-2" value={modificarLastName} onChange={(e) => setModificarLastName(e.target.value)} placeholder="apellido"></input>
                        <input className="rounded-2xl p-2" value={modificarUrl} onChange={(e) => setModificarUrl(e.target.value)} placeholder="url"></input>
                        <input className="rounded-2xl p-2" value={modificarPhone} onChange={(e) => setModificarPhone(e.target.value)}  placeholder="telefono"></input>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => submitInfo()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
                            <p>ID:{user.id}</p>
                            <div className=" flex flex-col gap-y-px" >
                                <p className="bg-amber-400 border-amber-600-2 p-3">Nombre completo: {user.name} {user.lastName}</p>
                                <p className="bg-amber-400 border-amber-600-2 p-3">Telefono: {user.phone}</p>
                            </div>
                        </div>
                        <div>
                            <img className="h-80 w-60 rounded-b-2xl border-b-4 border-t-0 border-r-4" src={user.url} ></img>
                        </div>
                    </div>
                   
                    
                    
                    
                </div>
                ): (
                    <Loading />
                )
            }
            <p>
                
            </p>
        </section>
    )
}

export default profileDynamic;
