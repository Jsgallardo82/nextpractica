"use client"

import  {Header}  from "../../components/header";
import { useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { db } from "@/firebaseConfig";
import { storage } from "@/firebaseConfig";
import { doc,setDoc , getDoc} from "firebase/firestore/lite"
import { AiOutlineSetting } from "react-icons/ai";
import { Loading } from "@/app/components/loading";
import { getStorage, ref , getDownloadURL, uploadBytes} from "firebase/storage";



const profileDynamic = () => {
    const [user, setUser] = useState();
    // console.log(user)
    // estados para modificar la informacion de la database 
    const [modificarName, setModificarName] = useState('');
    const [modificarLastName, setModificarLastName] = useState('');
    const [imagefile,setImagefile] = useState('')
    const [modificarPhone, setModificarPhone] = useState('');

    // estado de la imagen traida de la storage
    const[image, setImage ] = useState('')

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
            setModificarName(userData.name)
            setModificarLastName(userData.lastName)
            setImagefile(userData.url)
            setModificarPhone(userData.phone)
        };

        // funcion para traer la imagen, debe ser asincrona
        const getImage = async () => {
            // elegimos la imagen, por el nombre, del storage
            const imageRef =  ref(storage, 'fotoghibli.jpg');
            // de esta forma a la imagen referenciada le creamos una url o traemos la url de la storage
            const imageUrl = await getDownloadURL(imageRef)

            console.log("image",imageUrl);
            // ubicamos la imagen a la setImage, para que sea el estado de image 
            setImage(imageUrl)
    
        };

        getUser();
        getImage();
    },[])
    const submitInfo = async () => {
        const imagePath = await uploadImage(imagefile);
        
        
        await ModificarDataUser(imagePath);

        setModificarName("");
        setModificarLastName("");
        setModificarPhone("");
        setImagefile("")
    } 
    async function ModificarDataUser(imagePath) { 
        const userRef = doc(db,'users', params.userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const imagePathFull = ref(storage,imagePath);
        const imageFullUrl = await getDownloadURL(imagePathFull)

        await setDoc(userRef,{
            name: modificarName || userData.Name,
            lastName: modificarLastName || userData.lastName,
            url: imageFullUrl || userData.url,
            phone: modificarPhone|| userData.phone,
        }, { merge: true }); // `merge: true` para no sobrescribir toda la informacion
        // console.log("el nuevo nombre de usuario es ", user);     
    }
    useEffect(() => {
        // Importar Bootstrap JS solo en el lado del cliente
        import("bootstrap/dist/js/bootstrap.bundle.min");
      }, []);

    const uploadImage = async (e) => {
        const storageRef = ref(storage, `user-images/${e.name}`);
        // sube el archico
        const response = await uploadBytes(storageRef, e, {contentType: e.type, });
        return response.metadata.fullPath;
        
    }
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(
        "Hola! Soy una persona creativa, apasionada por el desarrollo y siempre con ganas de aprender cosas nuevas."
    );
    
    const handleSave = () => {
        setIsEditing(false);
    };


    return (
        <section className="bg-blue-900 h-screen">
            <Header />
            { user ? (
                <div className="flex flex-col bg-blue-900 gap-3">
                    <div className="flex justify-around">
                        <div className="flex flex-col m-0 p-0  w-1/2 gap-3 ">
                            <div className="flex gap-1 justify-between items-center text-4xl bg-blue-400 border-blue-600 border-2">
                                <div className="m-0 p-0">
                                    <div className="flex justify-start items-center m-0 p-0">
                                        <h2 className=" p-3 text-white "
                                            style={{
                                                textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                            }} > Perfil de:</h2>  
                                        <strong className="text-decoration-underline  text-white " style={{
                                                textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                            }} >{user.name}</strong>
                                    </div>
                                    
                                    
                                </div>
                                <div className="flex justify-end items-start">
                                    <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <p className="text-black-100 text-4xl"><AiOutlineSetting /></p>
                                    </button> 
                                </div>                               
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
                        {/* <input className="rounded-2xl p-2" value={modificarUrl} onChange={(e) => setModificarUrl(e.target.value)} placeholder="url"></input> */}
                        <input type="file" onChange={(e) => setImagefile(e.target.files[0])} className="rounded-2xl" placeholder="url"></input>
                        <input className="rounded-2xl p-2" value={modificarPhone} onChange={(e) => setModificarPhone(e.target.value)}  placeholder="telefono"></input>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => submitInfo()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
                            
                            <div className=" flex flex-col gap-y-px" >
                                <p className="bg-blue-400 border-blue-600 border-2 p-3 text-white text-2xl"
                                style={{
                                    textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                }}>Nombre completo: {user.name} {user.lastName}</p>
                                <p className="bg-blue-400 border-blue-600 border-2 p-3 text-white text-2xl"
                                style={{
                                    textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                }}>Telefono: {user.phone}</p>
                                {/* <img className="h-80 w-60 rounded-b-2xl border-b-4 border-t-0 border-r-4" src={image} ></img>
                                <img className="h-80 w-60 rounded-b-2xl border-b-4 border-t-0 border-r-4" src="https://firebasestorage.googleapis.com/v0/b/messenger-5c1b5.firebasestorage.app/o/fotoghibli.jpg?alt=media&token=3e352909-5581-4577-bc54-8e7536b03184" ></img>
                                 */}
                            </div>
                        </div>
                        <div >
                            <img className="h-80 w-60 rounded-b-2xl border-b-4 border-t-0 border-r-4" src={user.url} ></img>
                            <p className="bg-blue-700 border-blue-200 m-3 p-1  text-white text-sm rounded-xl"
                                    style={{
                                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                    }}>ID:{user.id}</p>
                        </div>

                        
                        
                    </div>
                   
                    <div className=" flex flex-col gap-y-px" >
                                <p className="bg-blue-400 border-blue-600 border-2 p-3 text-white text-2xl"
                                style={{
                                    textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                }}>Sobre mi</p>
                                <p className="bg-blue-400 border-blue-600 border-2 p-3 text-white text-2xl rounded-2xl"
                                style={{
                                    textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                                }}> "Soy una diseñadora de moda especializada en corte y costura, con un interés específico en prendas de punto y ropa a medida. Mi trabajo refleja una apreciación de los patrones intrincados, atención al detalle, color y textura, inspirada en un entusiasmo por la ropa vintage. Actualmente estoy buscando un ambiente de trabajo inspirador que me permita desarrollarme con una buena formación, respetando mi libertad creativa como artista." </p>
                                
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
