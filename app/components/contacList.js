import { ContactCard } from "./contactCard"
import { AiFillIdcard } from "react-icons/ai";
import {useState} from "react"
import { useEffect } from "react"; 
import {db} from "@/firebaseConfig"
import {collection, doc ,addDoc,setDoc } from 'firebase/firestore/lite';



export const ContactList = ({setActiveUser,usersList,activeUser}) => {
    // inputs del modal
    const [inputName,setInputName] = useState('') ;
    const [inputLastName,setInputLastName] = useState('') ;
    const [inputUrl,setInputUrl] = useState('') ;
    const [inputPhone,setInputPhone] = useState('') ;

    const submitInfo = async () => {
        const newUser = {
            name: inputName,
            lastName: inputLastName,
            url: inputUrl,
            phone: inputPhone,

        };
        
        // console.log(newUser);

        await addNewUser();

        setInputName("");
        setInputLastName("");
        setInputUrl("");
        setInputPhone("");


    } 
// Add a new document with a generated id.
// const docRef = await addDoc(collection(db, "cities"), {
//     name: "Tokyo",
//     country: "Japan"
//   });
//   console.log("Document written with ID: ", docRef.id);
    async function addNewUser() { 
        // se creo el nuevo usuario vacio 
        const newUser = await doc (collection(db,"users"))
        // se actualiza el nuevo usario con la informacion de los inputs ademas de tu propio id 
        await setDoc(newUser,{
            id: newUser.id,
            name: inputName,
            lastName: inputLastName,
            url: inputUrl || "https://images.vexels.com/media/users/3/136558/isolated/preview/43cc80b4c098e43a988c535eaba42c53-icono-de-usuario-de-persona.png",
            phone: inputPhone,
        });
        // console.log("el nuevo usuario es ", newUser);
        
    }

    useEffect(() => {
        // Importar Bootstrap JS solo en el lado del cliente
        import("bootstrap/dist/js/bootstrap.bundle.min");
      }, []);

    return(
        <nav className="display: flex flex-col h-[100vh] overflow-y-scroll">
            <div className="flex justify-around  bg-amber-300">
                <h2 >Lista de chats</h2>
                <button type="button" className="btn btn-warning border-2 border-black" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <p className="text-black-100 text-4xl"><AiFillIdcard /></p>
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Añadir contacto</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body flex flex-col">
                        <input value={inputName} onChange={(e) => setInputName(e.target.value)} className="rounded-2xl" placeholder="nombre" ></input>
                        <input value={inputLastName} onChange={(event) => setInputLastName(event.target.value)}  className="rounded-3xl" placeholder="apellido"></input>
                        <input value={inputUrl} onChange={(e) => setInputUrl(e.currentTarget.value)} className="rounded-2xl" placeholder="url"></input>
                        <input value={inputPhone} onChange={(e) => setInputPhone(e.currentTarget.value)}  className="rounded-2xl" placeholder="telefono"></input>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => submitInfo()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
            {usersList && usersList.map((user,index) => (
                <ContactCard
                    key={index}
                    user={user}
                    setActiveUser={setActiveUser}
                    activeUser={activeUser}
                />
            ))}
            
          
        </nav>
        
    )
}


 {/* el map ejecuta una funcion, toma el elemento en singular, y lo va a repetir en cada elemento de la funcion */}
            {/* se pone el index para evitar el error de unicidad */}